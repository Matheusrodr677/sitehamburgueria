const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsConstainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-bnt")
const closeModaltBtn = document.getElementById("close-modal-bnt")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

//abrir modal do carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal()
    cartModal.style.display = "flex"
})
// fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = 'none'
    }
})

closeModaltBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-car-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addTocart(name, price)


    }
})

//função para adicionar no carrinho
function addTocart(name, price){

    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    
    updateCartModal()

    
}
//atualizar o carrinho

function updateCartModal(){
    cartItemsConstainer.innerHTML = "";
    let total = 0;


    cart.forEach(item => {
        const cartItemsElement = document.createElement("div");
        cartItemsElement.classList.add('flex', "justify-between", "mb-4", "flex-col")
        
        cartItemsElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                <p class="font-medium">${item.name}</p>
                <p> Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                    <button class="remove-from-cart-btn" data-name="${item.name}">
                        Remover
                    </button>
              </div>
        `

        total += item.price * item.quantity;

        cartItemsConstainer.appendChild(cartItemsElement)
    })


    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}


//função para remover item do carrinho
cartItemsConstainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
    const name = event.target.getAttribute("data-name")

    removeItemsCart(name);
}

})


function removeItemsCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
          item.quantity -= 1;
          updateCartModal();
          return;
        }

        cart.splice(index, 1);
        updateCartModal();

    }
}

addressInput.addEventListener('input', function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})


checkoutBtn.addEventListener("click", function(event){
    
    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        
     
      Toastify({  
      text: "Ops! hamburgueria fechada no momento...",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      }}).showToast();
      return;
    }
    
    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    //Enviar o pedido para o whats

    const cartItem = cart.map((item) => {
        return(
            ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItem)
    const phone = "84996386040"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    cart = [];
    updateCartModal();
})


//verificar a hora e manipular
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22; //true = restaurante esta aberto
}


const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen()

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add('bg-green-600')
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}