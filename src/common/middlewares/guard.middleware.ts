import { SetMetadata } from '@nestjs/common';

export const SkipGlobalGuard = () => SetMetadata('skipGlobalGuard', true);
