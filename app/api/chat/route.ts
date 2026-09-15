import { NextResponse } from 'next/server';

const products = [
  { id: 1, name: 'Minimalist Black Hoodie', price: 50, category: 'hoodie', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Sleek Cocktail Slip Dress', price: 140, category: 'dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Ruby Red Statement Glasses', price: 75, category: 'accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Essential Zip Hoodie', price: 98, category: 'hoodie', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Minimal Runner Shoes', price: 90, category: 'shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' }
];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const query = message.toLowerCase();

    interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

let reply = "I can help you find dresses, hoodies, shoes, or accessories. What are you looking for?";
let matchedProducts: Product[] = [];

    if (query.includes('cocktail') || query.includes('party') || query.includes('dress')) {
      matchedProducts = products.filter(p => p.category === 'dress');
      reply = "For a cocktail party, I recommend our elegant evening wear and dresses:";
    } else if (query.includes('hoodie')) {
      matchedProducts = products.filter(p => p.price <= 50 || p.name.toLowerCase().includes('hoodie'));
      reply = "Here are our affordable hoodie options:";
    } else if (query.includes('glasses') || query.includes('red')) {
      matchedProducts = products.filter(p => p.category === 'accessories');
      reply = "Here are our statement accessories and red glasses:";
    } else if (query.includes('shoes') || query.includes('cheaper')) {
      matchedProducts = products.filter(p => p.category === 'shoes');
      reply = "Here are our footwear options:";
    }

    return NextResponse.json({ reply, products: matchedProducts });
  } catch (error) {
    return NextResponse.json({ reply: "Sorry, something went wrong processing your request.", products: [] }, { status: 500 });
  }
}