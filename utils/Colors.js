export const colors = {
    Car : 'rgb(220, 20, 60,',
    Grocery : 'rgb(70, 130, 180,',
    Hobbies : 'rgb(0, 128, 128,',
    Home : 'rgb(72, 61, 139,',
    Phone : 'rgb(46, 139, 87,',
    Projects : 'rgb(25, 25, 112,',
    Savings : 'rgb(205, 92, 92,',
    Transport : 'rgb(60, 179, 113,',
    Travel : 'rgb(30, 144, 255,' 
  }

export function getColor(category,opacity) {
  return (colors[category] ? `${colors[category]}${opacity})` : `rgb(237, 81, 81,${opacity})`);
} 