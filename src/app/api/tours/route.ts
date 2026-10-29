import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

// Path to tours data files
const INTERNATIONAL_TOURS_PATH = path.join(process.cwd(), 'src', 'data', 'internationalTours.ts');
const DOMESTIC_TOURS_PATH = path.join(process.cwd(), 'src', 'data', 'domesticTours.ts');

// Helper function to read tour data
const readToursData = async () => {
  try {
    const internationalData = await readFile(INTERNATIONAL_TOURS_PATH, 'utf-8');
    const domesticData = await readFile(DOMESTIC_TOURS_PATH, 'utf-8');
    return { internationalData, domesticData };
  } catch (error) {
    console.error('Error reading tours data:', error);
    return { internationalData: '', domesticData: '' };
  }
};

// GET all tours
export async function GET() {
  try {
    // For now, just return empty - tours are loaded from static files
    return NextResponse.json({
      message: 'Tours are loaded from static files. Use the admin panel to view them.',
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load tours', message: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST to update tours (admin only)
export async function POST(request: Request) {
  try {
    const { action, tour, tourId } = await request.json();
    
    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    // In production, you would validate admin authentication here
    // For now, we'll just return a message
    return NextResponse.json({
      message: 'Tours are managed through static files. To update, edit the data files directly or use a proper CMS.',
      success: false,
      note: 'For a production site, set up Payload CMS or another content management system.'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update tours', message: (error as Error).message },
      { status: 500 }
    );
  }
}
