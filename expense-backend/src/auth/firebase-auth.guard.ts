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

// Express request par Firebase se verify hua user token rakhne ka type.
type AuthenticatedRequest = Request & { user?: DecodedIdToken };

// NestJS guard: controller tak request pahunchne se pehle user ko authenticate karta hai.
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  // true return hone par request aage jaati hai; exception throw hone par rok di jaati hai.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // HTTP request ko nikaalte hain aur usme verified user ke liye type add karte hain.
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    // Authorization header se "Bearer <token>" format ka token nikaalte hain.
    const match = request.headers.authorization?.match(/^Bearer\s+(\S+)$/i);
    if (!match) {
      // Header missing ya format galat ho to authentication required hai.
      throw new UnauthorizedException('A valid bearer token is required');
    }

    try {
      // Firebase Admin token verify karta hai aur decoded user data request par set hota hai.
      request.user = await getAuth(admin.getApp()).verifyIdToken(match[1]);
      // Verified token ke baad controller/service request process kar sakte hain.
      return true;
    } catch (error) {
      if (error instanceof FirebaseAuthError) {
        // Invalid ya expired Firebase token par client ko 401 response dete hain.
        throw new UnauthorizedException('Invalid or expired Firebase token');
      }

      // Unexpected errors ko chupane ke bajay NestJS error handler tak bhejte hain.
      throw error;
    }
  }
}
