import { SetMetadata } from '@nestjs/common';

export const LOG_TYPE_KEY = 'logType';

export const LogType = (type: string) => SetMetadata(LOG_TYPE_KEY, type);
