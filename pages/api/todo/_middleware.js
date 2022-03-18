import { NextResponse } from 'next/server';

const jwt = require('jsonwebtoken');
const JWT_key = process.env.JWT_INFO;

export async function middleware (req){
    NextResponse.next();
}