const sortableList = document.getElementById("sortableList");
let draggedItem = null;

sortableList.addEventListener("dragstart", (event) => {
  const item = event.target.closest(".list-item");

  if (!item) {
    return;
  }

  draggedItem = item;
  item.classList.add("dragging");
});

sortableList.addEventListener("dragend", () => {
  if (draggedItem) {
    draggedItem.classList.remove("dragging");
  }

  removeHighlight();
  draggedItem = null;
});

sortableList.addEventListener("dragover", (event) => {
  event.preventDefault();

  const targetItem = event.target.closest(".list-item");

  removeHighlight();

  if (!targetItem || targetItem === draggedItem) {
    return;
  }

  targetItem.classList.add("over");
});

sortableList.addEventListener("drop", (event) => {
  event.preventDefault();

  const targetItem = event.target.closest(".list-item");

  if (!targetItem || targetItem === draggedItem) {
    return;
  }

  const items = [...sortableList.children];
  const draggedIndex = items.indexOf(draggedItem);
  const targetIndex = items.indexOf(targetItem);

  if (draggedIndex < targetIndex) {
    sortableList.insertBefore(draggedItem, targetItem.nextSibling);
  } else {
    sortableList.insertBefore(draggedItem, targetItem);
  }

  removeHighlight();
});

function removeHighlight() {
  const listItems = document.querySelectorAll(".list-item");

  listItems.forEach((item) => {
    item.classList.remove("over");
  });
}
