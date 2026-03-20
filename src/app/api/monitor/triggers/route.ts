import { NextResponse } from 'next/server';

const CHENNAI_ZONES = [
  { pincode: '600017', name: 'T. Nagar', coords: [80.2341, 13.0418] },
  { pincode: '600042', name: 'Velachery', coords: [80.2212, 12.9750] },
  { pincode: '600020', name: 'Adyar', coords: [80.2565, 13.0012] },
  { pincode: '600032', name: 'Guindy', coords: [80.2206, 13.0067] },
  { pincode: '600119', name: 'Sholinganallur', coords: [80.2273, 12.8988] },
];

export async function GET() {
  // 30% chance there's a threshold crossing event, otherwise nominal
  const isThresholdCrossed = Math.random() > 0.7;
  
  if (isThresholdCrossed) {
    const randomZone = CHENNAI_ZONES[Math.floor(Math.random() * CHENNAI_ZONES.length)];
    const triggers = ['Heavy Rain Alert', 'AQI > 300', 'Extreme Heat Wave', 'Waterlogging'];
    const triggerType = triggers[Math.floor(Math.random() * triggers.length)];
    
    return NextResponse.json({
      status: 'Threshold Crossed',
      event: {
        id: Date.now(),
        zone: `${randomZone.name}, CHN`,
        pincode: randomZone.pincode,
        coordinates: randomZone.coords,
        triggerType: triggerType,
        severity: Math.floor(Math.random() * 40) + 60, // 60-100 severity
        timestamp: new Date().toISOString()
      }
    });
  }

  return NextResponse.json({
    status: 'Nominal',
    event: null
  });
}
