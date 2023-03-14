#! /bin/bash
FILE_PATH=packages/shared/secrets.ts
if [ -f "$FILE_PATH" ]; then
    exit 0
fi
echo "export const SPOTIFY_CLIENT_ID = '';
export const SPOTIDY_CLIENT_SECRET = '';" > $FILE_PATH