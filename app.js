// app.js
// CRUD simple usando LocalStorage

const STORAGE_KEY = "items_v1";

// Cargar datos del LocalStorage
let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Elementos del DOM
const form = document.getElementById("itemForm");
const itemList = document.getElementById("itemList");
const inputName = document.getElementById("name");
const inputQty = document.getElementById("qty");
const emptyMsg = document.getElementById("emptyMsg");

// Renderiza la lista
function renderItems() {
  itemList.innerHTML = "";

  if (!items.length) {
    emptyMsg.style.display = "block";
    return;
  } else {
    emptyMsg.style.display = "none";
  }

  items.forEach((item, index) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "item-info";
    info.textContent = `${item.name} (Cantidad: ${item.qty})`;

    const actions = document.createElement("div");
    actions.className = "actions";

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Editar";
    btnEdit.className = "edit";
    btnEdit.onclick = () => editItem(index);

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Eliminar";
    btnDelete.className = "delete";
    btnDelete.onclick = () => deleteItem(index);

    actions.appendChild(btnEdit);
    actions.appendChild(btnDelete);

    li.appendChild(info);
    li.appendChild(actions);
    itemList.appendChild(li);
  });
}

// Guardar en LocalStorage
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Agregar item
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputName.value.trim();
  const qty = Number(inputQty.value);

  // Validaciones básicas
  if (!name) return alert("Escribe un nombre válido.");
  if (!qty || qty <= 0) return alert("Cantidad debe ser mayor que 0.");

  const newItem = {
    id: Date.now(),
    name,
    qty,
  };

  items.push(newItem);
  saveData();
  renderItems();
  form.reset();
  inputName.focus();
});

// Editar item
function editItem(index) {
  const current = items[index];
  const newName = prompt("Nuevo nombre:", current.name);
  if (newName === null) return; // cancelar

  const newQtyStr = prompt("Nueva cantidad:", String(current.qty));
  if (newQtyStr === null) return; // cancelar

  const newQty = Number(newQtyStr);
  if (!newName.trim() || !newQty || newQty <= 0) {
    return alert("Nombre o cantidad inválida. Edición cancelada.");
  }

  items[index].name = newName.trim();
  items[index].qty = newQty;
  saveData();
  renderItems();
}

// Eliminar item (confirmación)
function deleteItem(index) {
  const ok = confirm(`Eliminar "${items[index].name}"?`);
  if (!ok) return;
  items.splice(index, 1);
  saveData();
  renderItems();
}

// Inicializar
renderItems();
