const SUPABASE_URL = "https://rbmdgpyvznfjokzinxje.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibWRncHl2em5mam9remlueGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4Njg2MjksImV4cCI6MjA5NDQ0NDYyOX0.QCDR49iTHo1RNUzSRcz3a_13hT6l_T8f4AXFiF0kaa8";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchProducts() {
    const { data, error } = await _supabase.from('products').select('*');
    const list = document.getElementById('product-list');
    
    if (error) {
        list.innerHTML = "<p>Error loading products.</p>";
        return;
    }

    list.innerHTML = data.map(product => `
        <div class="product-card p-2">
            <img src="${product.image}" class="rounded-lg mb-2 w-full aspect-square object-cover" alt="${product.name}">
            <h4 class="font-medium text-sm">${product.name}</h4>
            <p class="text-yellow-500 font-bold">৳ ${product.price}</p>
            <button onclick="orderNow('${product.name}', ${product.price})" class="w-full bg-white text-black text-xs font-bold py-2 mt-2 rounded">ORDER NOW</button>
        </div>
    `).join('');
}

function orderNow(name, price) {
    const customer = prompt("Enter your Name and Phone Number:");
    if (!customer) return;
    
    saveOrder(customer, name, price);
}

async function saveOrder(customer, prodName, price) {
    const { data, error } = await _supabase.from('orders').insert([
        { customer_name: customer, product_name: prodName, total_price: price, status: 'pending' }
    ]);

    if (error) {
        alert("Order failed. Try again.");
    } else {
        alert("Order successful! We will call you soon.");
    }
}

fetchProducts();
