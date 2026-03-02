#!/bin/bash

# Hisab App Setup Script
# This script sets up the development environment for the Hisab app

echo "🚀 Setting up Hisab App..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js version
echo -e "${BLUE}Checking Node.js version...${NC}"
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${RED}Error: Node.js 20+ required. Current version: $(node -v)${NC}"
    echo "Please upgrade Node.js: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check if npm is installed
echo -e "${BLUE}Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to install dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Setup environment file
echo -e "${BLUE}Setting up environment...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠ Please update .env file with your configuration${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Setup pre-commit hooks (optional)
echo -e "${BLUE}Setting up git hooks...${NC}"
if [ -d .git ]; then
    npx husky install 2>/dev/null || echo -e "${YELLOW}⚠ husky not installed${NC}"
fi

# Create necessary directories
echo -e "${BLUE}Creating directories...${NC}"
mkdir -p android/app/src/main/assets
mkdir -p ios/Hisab/Images.xcassets

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update .env file with your Google OAuth credentials"
echo "2. Update app.json with your app configuration"
echo "3. Add app icons to assets/ folder"
echo "4. Run 'npm start' to start the development server"
echo ""
echo -e "${BLUE}For more information, see README.md${NC}"
