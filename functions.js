export default function walls() {
  // wall to the left
  if (tomato.x < 0 + tomato.width / 2 || tomato.x < tomato.width / 2) {
    if (keys['37']) {
      keys['37'] = null;
    }
  }
  // wall to the top
  else if (tomato.y < 0 + tomato.height / 2 || tomato.y < tomato.height / 2) {
    if (keys['38']) {
      keys['38'] = null;
    }
  }
  // wall to the right
  else if (
    tomato.x > app.view.width - tomato.width / 2 ||
    tomato.x < tomato.width / 2
  ) {
    if (keys['39']) {
      keys['39'] = null;
    }
  }
  // wall to the down
  else if (
    tomato.y > app.view.height - tomato.height / 2 ||
    tomato.x < tomato.height / 2
  ) {
    if (keys['40']) {
      keys['40'] = null;
    }
  }
}
