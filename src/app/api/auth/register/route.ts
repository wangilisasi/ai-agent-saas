import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { registerSchema } from '@/lib/schemas/auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedCredentials = registerSchema.safeParse(body);

    if (!parsedCredentials.success) {
      return NextResponse.json({ message: 'Invalid input', errors: parsedCredentials.error.errors }, { status: 400 });
    }

    const { email, password, name } = parsedCredentials.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
      },
    });

    return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
} 