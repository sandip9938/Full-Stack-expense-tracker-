import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseAuthError, getAuth } from 'firebase-admin/auth';
import type { DecodedIdToken } from 'firebase-admin/auth';
import type { Request } from 'express';
import admin from '../firebase/firebase-admin.js';

type AuthenticatedRequest = Request & { user?: DecodedIdToken };

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const match = request.headers.authorization?.match(/^Bearer\s+(\S+)$/i);
    if (!match) {
      throw new UnauthorizedException('A valid bearer token is required');
    }

    try {
      request.user = await getAuth(admin.getApp()).verifyIdToken(match[1]);
      return true;
    } catch (error) {
      if (error instanceof FirebaseAuthError) {
        throw new UnauthorizedException('Invalid or expired Firebase token');
      }

      throw error;
    }
  }
}
