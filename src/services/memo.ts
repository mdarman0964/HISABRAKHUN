import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { MAX_FILE_SIZE, SUPPORTED_IMAGE_TYPES, SUPPORTED_DOCUMENT_TYPES } from '../constants';

export interface MemoFile {
  uri: string;
  name: string;
  type: string;
  size: number;
}

export class MemoService {
  static async requestPermissions(): Promise<boolean> {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return cameraStatus === 'granted' && mediaStatus === 'granted';
  }

  static async pickImageFromGallery(): Promise<MemoFile | null> {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
      }

      const asset = result.assets[0];
      const fileInfo = await FileSystem.getInfoAsync(asset.uri);

      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }

      // Compress image if needed
      let finalUri = asset.uri;
      if (fileInfo.size > MAX_FILE_SIZE) {
        const compressed = await this.compressImage(asset.uri);
        finalUri = compressed.uri;
      }

      return {
        uri: finalUri,
        name: `image_${Date.now()}.jpg`,
        type: 'image/jpeg',
        size: fileInfo.size || 0,
      };
    } catch (error: any) {
      console.error('Pick Image Error:', error);
      throw new Error('Failed to pick image: ' + error.message);
    }
  }

  static async captureImageFromCamera(): Promise<MemoFile | null> {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
      }

      const asset = result.assets[0];
      const fileInfo = await FileSystem.getInfoAsync(asset.uri);

      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }

      return {
        uri: asset.uri,
        name: `camera_${Date.now()}.jpg`,
        type: 'image/jpeg',
        size: fileInfo.size || 0,
      };
    } catch (error: any) {
      console.error('Capture Image Error:', error);
      throw new Error('Failed to capture image: ' + error.message);
    }
  }

  static async pickDocument(): Promise<MemoFile | null> {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: SUPPORTED_DOCUMENT_TYPES,
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
      }

      const asset = result.assets[0];
      const fileInfo = await FileSystem.getInfoAsync(asset.uri);

      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }

      if (fileInfo.size > MAX_FILE_SIZE) {
        throw new Error('File size exceeds 10MB limit');
      }

      return {
        uri: asset.uri,
        name: asset.name || `document_${Date.now()}.pdf`,
        type: asset.mimeType || 'application/pdf',
        size: fileInfo.size || 0,
      };
    } catch (error: any) {
      console.error('Pick Document Error:', error);
      throw new Error('Failed to pick document: ' + error.message);
    }
  }

  static async compressImage(uri: string): Promise<{ uri: string; size: number }> {
    try {
      const manipulated = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1200 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      const fileInfo = await FileSystem.getInfoAsync(manipulated.uri);
      return {
        uri: manipulated.uri,
        size: fileInfo.size || 0,
      };
    } catch (error: any) {
      console.error('Compress Image Error:', error);
      throw new Error('Failed to compress image: ' + error.message);
    }
  }

  static async saveMemoToLocal(memoFile: MemoFile, transactionId: string): Promise<string> {
    try {
      const memoDir = `${FileSystem.documentDirectory}memos/${transactionId}/`;
      await FileSystem.makeDirectoryAsync(memoDir, { intermediates: true });

      const fileName = memoFile.name;
      const destinationUri = memoDir + fileName;

      await FileSystem.copyAsync({
        from: memoFile.uri,
        to: destinationUri,
      });

      return destinationUri;
    } catch (error: any) {
      console.error('Save Memo Error:', error);
      throw new Error('Failed to save memo: ' + error.message);
    }
  }

  static async deleteMemo(memoUri: string): Promise<void> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(memoUri);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(memoUri);
      }
    } catch (error: any) {
      console.error('Delete Memo Error:', error);
      throw new Error('Failed to delete memo: ' + error.message);
    }
  }

  static async getMemoFileInfo(uri: string): Promise<{ exists: boolean; size?: number }> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      return {
        exists: fileInfo.exists,
        size: fileInfo.size,
      };
    } catch (error) {
      return { exists: false };
    }
  }

  static isImage(type: string): boolean {
    return SUPPORTED_IMAGE_TYPES.includes(type);
  }

  static isDocument(type: string): boolean {
    return SUPPORTED_DOCUMENT_TYPES.includes(type);
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static getFileIcon(type: string): string {
    if (this.isImage(type)) return 'image';
    if (type.includes('pdf')) return 'file-text';
    if (type.includes('word')) return 'file-text';
    return 'file';
  }
}
