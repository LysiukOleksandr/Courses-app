document.querySelectorAll('.price').forEach((node) => {
  node.textContent = new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency',
  }).format(node.textContent)
})

const $cart = document.querySelector('#cart')

if ($cart) {
  $cart.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id
      fetch('cart/remove/' + id, {
        method: 'delete',
      })
        .then((res) => res.json())
        .then((cart) => {
          console.log(cart)
        })
    }
  })
}
