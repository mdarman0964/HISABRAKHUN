import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { BackupData, Transaction, Category } from '../types';
import { GOOGLE_DRIVE_CONFIG } from '../constants';

export class BackupService {
  private static async getAccessToken(): Promise<string> {
    const tokens = await GoogleSignin.getTokens();
    return tokens.accessToken;
  }

  static async createBackup(
    transactions: Transaction[],
    categories: Category[],
    userId: string
  ): Promise<{ success: boolean; fileId?: string; error?: string }> {
    try {
      const accessToken = await this.getAccessToken();
      
      const backupData: BackupData = {
        transactions,
        categories,
        backupDate: new Date().toISOString(),
        userId,
        version: '1.0.0',
      };

      // Search for existing backup folder
      const folderId = await this.getOrCreateBackupFolder(accessToken);
      
      // Create backup file
      const fileName = `${GOOGLE_DRIVE_CONFIG.BACKUP_FILE_NAME}_${new Date().toISOString().split('T')[0]}.json`;
      
      const metadata = {
        name: fileName,
        mimeType: 'application/json',
        parents: [folderId],
      };

      const formData = new FormData();
      formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      formData.append('file', new Blob([JSON.stringify(backupData)], { type: 'application/json' }));

      const response = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Backup failed');
      }

      const result = await response.json();
      return { success: true, fileId: result.id };
    } catch (error: any) {
      console.error('Backup Error:', error);
      return { success: false, error: error.message };
    }
  }

  static async restoreBackup(): Promise<{
    success: boolean;
    data?: BackupData;
    error?: string;
  }> {
    try {
      const accessToken = await this.getAccessToken();
      
      // Get backup folder
      const folderId = await this.getBackupFolder(accessToken);
      if (!folderId) {
        return { success: false, error: 'No backup found' };
      }

      // Get latest backup file
      const files = await this.listBackupFiles(accessToken, folderId);
      if (files.length === 0) {
        return { success: false, error: 'No backup files found' };
      }

      // Sort by created time (newest first)
      const latestFile = files.sort(
        (a: any, b: any) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
      )[0];

      // Download backup file
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${latestFile.id}?alt=media`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to download backup');
      }

      const backupData: BackupData = await response.json();
      return { success: true, data: backupData };
    } catch (error: any) {
      console.error('Restore Error:', error);
      return { success: false, error: error.message };
    }
  }

  private static async getOrCreateBackupFolder(accessToken: string): Promise<string> {
    const existingFolder = await this.getBackupFolder(accessToken);
    if (existingFolder) {
      return existingFolder;
    }

    // Create new folder
    const metadata = {
      name: GOOGLE_DRIVE_CONFIG.BACKUP_FOLDER_NAME,
      mimeType: 'application/vnd.google-apps.folder',
    };

    const response = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      throw new Error('Failed to create backup folder');
    }

    const result = await response.json();
    return result.id;
  }

  private static async getBackupFolder(accessToken: string): Promise<string | null> {
    const query = encodeURIComponent(
      `name='${GOOGLE_DRIVE_CONFIG.BACKUP_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
    );

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    if (result.files && result.files.length > 0) {
      return result.files[0].id;
    }

    return null;
  }

  private static async listBackupFiles(accessToken: string, folderId: string): Promise<any[]> {
    const query = encodeURIComponent(
      `'${folderId}' in parents and mimeType='application/json' and trashed=false`
    );

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=createdTime desc`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result.files || [];
  }

  static async listAllBackups(): Promise<any[]> {
    try {
      const accessToken = await this.getAccessToken();
      const folderId = await this.getBackupFolder(accessToken);
      
      if (!folderId) {
        return [];
      }

      return await this.listBackupFiles(accessToken, folderId);
    } catch (error) {
      console.error('List Backups Error:', error);
      return [];
    }
  }

  static async deleteBackup(fileId: string): Promise<boolean> {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Delete Backup Error:', error);
      return false;
    }
  }
}
