let item_card__qty = document.getElementsByClassName("item_card__qty");
let item_price = document.getElementsByClassName("item_price");
let item_card__calc_price = document.getElementsByClassName("item_card__calc_price");
let decrease_btn = document.getElementsByClassName("decrease_btn");
let increase_btn = document.getElementsByClassName("increase_btn");
let add_to_cart_btn = document.getElementsByClassName("add_to_cart_btn");

let notify_div = document.getElementById("notify_div");
let notification = document.getElementById("notification");

Array.from(decrease_btn).forEach((btn, index)=> {
  btn.addEventListener("click", ()=> {
    if (Number(item_card__qty[index].innerText) >= 1) {
      item_card__qty[index].innerText = Number(item_card__qty[index].innerText) - 1;
      item_card__calc_price[index].innerText = individualItemPriceCalculator(Number(item_card__qty[index].innerHTML), Number(item_price[index].innerText));
    }
  });
});
Array.from(increase_btn).forEach((btn, index)=> {
  btn.addEventListener("click", ()=> {
    if (Number(item_card__qty[index].innerText) >= 0) {
      item_card__qty[index].innerText = Number(item_card__qty[index].innerText) + 1;
      item_card__calc_price[index].innerText = individualItemPriceCalculator(Number(item_card__qty[index].innerHTML), Number(item_price[index].innerText));
    }
  });
});
function individualItemPriceCalculator(qty, price) {
  return (qty * price);
}

let cart_item_boxes_div = document.getElementById("cart_item_boxes_div");
let main_item_name = document.getElementsByClassName("main_item_name");
let cart_total_price = document.getElementById("cart_total_price");

Array.from(add_to_cart_btn).forEach((btn, index)=> {
  btn.addEventListener("click", ()=> {
    if(Number(item_card__calc_price[index].innerText) > 0) {
      cart_item_boxes_div.innerHTML += `
      <div class="cart_item_box">
        <div>
          <div><span class="cart_item_name">${main_item_name[index].innerText}</span><span> x<span class="cart_item_qty">${item_card__qty[index].innerText}</span></span></div>
          <div>Rs. <span class="cart_item_calc_price">${item_card__calc_price[index].innerText}</span></div>
        </div>
        <div class="flex-row justify-center align-center">
          <div class="cart_inc_dec_btns_div">
            <button class="medium_btn cart_decrease_btn">-</button>
            <button class="medium_btn cart_increase_btn">+</button>
          </div>
          <button class="large_btn cart_edit_btn">Edit</button>
        </div>
        <div class="flex-row justify-center align-center">
          <div class="cart_ok_cancel_btns_div">
            <button class="small_btn cart_ok_btn">OK</button>
            <button class="small_btn cart_cancel_btn">Cancel</button>
          </div>
          <button class="small_btn cart_remove_btn"><i class="fa-solid fa-x"></i></button>
        </div>
      </div>`;

      let cart_decrease_btn = document.getElementsByClassName("cart_decrease_btn");
      let cart_increase_btn = document.getElementsByClassName("cart_increase_btn");
      let cart_item_qty = document.getElementsByClassName("cart_item_qty");
      let cart_item_calc_price = document.getElementsByClassName("cart_item_calc_price");
      let cart_item_name = document.getElementsByClassName("cart_item_name");
      
      // These two lines reset item price and quantity to zero after the item has been added to the cart.
      item_card__qty[index].innerText = "0";
      item_card__calc_price[index].innerText = individualItemPriceCalculator(Number(item_card__qty[index].innerHTML), Number(item_price[index].innerText));

      // These lines calculate total price in cart whenever a new item is added to the cart
      let total_price_temp = 0;
      Array.from(cart_item_calc_price).forEach((cart_item_calc_price_item, cart_item_calc_price_index)=> {
        total_price_temp = total_price_temp + Number(cart_item_calc_price_item.innerText)
        cart_total_price.innerText = total_price_temp;
      });

      
      
      let cart_remove_btn = document.getElementsByClassName("cart_remove_btn");
      let cart_edit_btn = document.getElementsByClassName("cart_edit_btn");
      let cart_ok_cancel_btns_div = document.getElementsByClassName("cart_ok_cancel_btns_div");
      let cart_inc_dec_btns_div = document.getElementsByClassName("cart_inc_dec_btns_div");
      let cart_ok_btn = document.getElementsByClassName("cart_ok_btn");
      let cart_cancel_btn = document.getElementsByClassName("cart_cancel_btn");
      // Edit function. Adds increment, decremnt, ok and cancel buttons to cart_item_box
      let temp_cart_item_box_index_arr = [];
      let temp_cart_item_qty_arr = [];
      let temp_cart_item_calc_price_arr = [];
      Array.from(cart_edit_btn).forEach((edit_btn, ebi)=> {
        edit_btn.addEventListener("click", function() {
          cart_ok_cancel_btns_div[ebi].style.display = "block";
          cart_inc_dec_btns_div[ebi].style.display = "block";
          cart_remove_btn[ebi].style.display = "none";
          edit_btn.style.display = "none";

          temp_cart_item_box_index_arr.push(ebi);
          temp_cart_item_qty_arr.push(cart_item_qty[ebi].innerText);
          temp_cart_item_calc_price_arr.push(cart_item_calc_price[ebi].innerText);

          // Ok button event
          Array.from(cart_ok_btn).forEach(function(ok_btn, ok_btn_ind) {
            ok_btn.addEventListener("click", function() {
              total_price_temp = 0;

              cart_ok_cancel_btns_div[ok_btn_ind].style.display = "none";
              cart_inc_dec_btns_div[ok_btn_ind].style.display = "none";
              cart_remove_btn[ok_btn_ind].style.display = "inline";
              cart_edit_btn[ok_btn_ind].style.display = "inline";

              temp_cart_item_qty_arr[ok_btn_ind] = cart_item_qty[ok_btn_ind].innerText;
              temp_cart_item_calc_price_arr[ok_btn_ind] = cart_item_calc_price[ok_btn_ind].innerText;
              
              Array.from(cart_item_calc_price).forEach((cart_item_calc_price_item, cart_item_calc_price_index)=> {
                total_price_temp +=  Number(cart_item_calc_price_item.innerText);
                cart_total_price.innerText = total_price_temp;
                
                if(cart_item_qty[cart_item_calc_price_index].innerText === "0") {
                  cart_item_box[cart_item_calc_price_index].style.display = "none";
                  showNotifyDiv("green", "Item removed from Cart.");
                }
              });
            })
          });
  
          let temp_ind_for_cancel_btn_function = 0;
          // Cancel button event
          Array.from(cart_cancel_btn).forEach(function(cancel_btn, cancel_btn_ind) {
            cancel_btn.addEventListener("click", function() {
              temp_ind_for_cancel_btn_function = temp_cart_item_box_index_arr.indexOf(cancel_btn_ind);

              cart_item_qty[cancel_btn_ind].innerText = temp_cart_item_qty_arr[temp_ind_for_cancel_btn_function];
              cart_item_calc_price[cancel_btn_ind].innerText = temp_cart_item_calc_price_arr[temp_ind_for_cancel_btn_function];

              cart_ok_cancel_btns_div[cancel_btn_ind].style.display = "none";
              cart_inc_dec_btns_div[cancel_btn_ind].style.display = "none";
              cart_remove_btn[cancel_btn_ind].style.display = "inline";
              cart_edit_btn[cancel_btn_ind].style.display = "inline";
            })
          });
        });

        
      });
      
      
      let cart_item_box = document.getElementsByClassName("cart_item_box");
      // Remove function. Removes specific cart_item_box from cart.
      Array.from(cart_remove_btn).forEach((c_rem_btn, c_rem_btn_ind)=> {
        c_rem_btn.addEventListener("click", function() {
          cart_total_price.innerText = Number(cart_total_price.innerText) - Number(cart_item_calc_price[c_rem_btn_ind].innerText);
          cart_item_box[c_rem_btn_ind].parentNode.removeChild(cart_item_box[c_rem_btn_ind]);
          showNotifyDiv("green", "Item removed from Cart.");
        });
      });

      // These functions are used to increment and decrement quantity in cart
      Array.from(cart_decrease_btn).forEach((btn, index)=> {
        btn.addEventListener("click", ()=> {
          if (Number(cart_item_qty[index].innerText) >= 1) {
            let specific_item_name = cart_item_name[index].innerText;
            let cart_item_price = 0;
            Array.from(main_item_name).forEach((i_name, i_index)=> {
              if(i_name.innerText === specific_item_name) {
                cart_item_price = Number(item_price[i_index].innerText);
              }
            });
            cart_item_qty[index].innerText = Number(cart_item_qty[index].innerText) - 1;
            cart_item_calc_price[index].innerText = individualItemPriceCalculator(Number(cart_item_qty[index].innerHTML), cart_item_price);
          }
        });
      });
      Array.from(cart_increase_btn).forEach((btn, index)=> {
        btn.addEventListener("click", ()=> {
          if (Number(cart_item_qty[index].innerText) >= 0) {
            let specific_item_name = cart_item_name[index].innerText;
            let cart_item_price = 0;
            Array.from(main_item_name).forEach((i_name, i_index)=> {
              if(i_name.innerText === specific_item_name) {
                cart_item_price = Number(item_price[i_index].innerText);
              }
            });
            cart_item_qty[index].innerText = Number(cart_item_qty[index].innerText) + 1;
            cart_item_calc_price[index].innerText = individualItemPriceCalculator(Number(cart_item_qty[index].innerHTML), Number(cart_item_price));
          }
        });
      });
      showNotifyDiv("green", "Item added to Cart.");
    } else {
      showNotifyDiv("red", "Please select at least one item");
    }
  });
});

document.getElementById("notification_remove_btn").addEventListener("click", function() {
  notify_div.style.opacity = "0";
  notify_div.style.transition = ".2s opacity";
});

function showNotifyDiv(color, text) {
  notify_div.style.background = color;
  notify_div.style.opacity = "1";
  notification.innerText = text;
  setTimeout(hideNotifyDivAfterSomeTime, 2500);
}

function hideNotifyDivAfterSomeTime() {
  notify_div.style.opacity = "0";
  notify_div.style.transition = ".6s opacity";
}


let cart_control_btn = document.getElementById("cart_control_btn");

cart_control_btn.addEventListener("click", function() {
  if (document.getElementById("cart").style.display == "none") {
    document.getElementById("cart").style.display = "block";
    cart_control_btn.style.color = "red";
    cart_control_btn.innerHTML = `
    Cart<i id="cart_control_btn_icon" class="fa-solid fa-x"></i>`;
  } else {
    document.getElementById("cart").style.display = "none";
    cart_control_btn_icon.classList = "fa-solid fa-bars";    
    cart_control_btn.style.color = "black";
    cart_control_btn.innerHTML = `
      Cart<i id="cart_control_btn_icon" class="fa-solid fa-bars"></i>`;
  }
});