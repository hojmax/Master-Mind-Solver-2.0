let scale = 25
let spacing = 5
let board = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [1, 1, 2, 2, -1, -1]
]

let highlightJ = 4
let hightlightI = 9
let validInput = false
let buttonX = scale + 2 * spacing
let buttonY = 370
let buttonW = 4 * scale + 3 * spacing
let buttonH = 50
let candidatesLeft = 1296

function drawInterface() {
  validInput = isValidInput()
  background(255)
  drawHighlight(spacing, 1)
  drawBoard(spacing, 1)
  drawClues(4 * (scale + spacing) + spacing, 1)
  drawInputs(0, 320)
  drawButton()
  drawCandidatesLeft()
}

function drawCandidatesLeft() {
  noStroke()
  fill(0)
  textSize(15)
  text("Candidates left: " + candidatesLeft, 21, 450)
}

function drawButton() {
  if (validInput) {
    fill(170)
  } else {
    fill(240)
  }
  stroke(0)
  rect(buttonX, buttonY, buttonW, buttonH)
  if (validInput) {
    fill(0)
  } else {
    fill(120)
  }
  noStroke()
  textSize(20)
  text("Run", buttonX + buttonW / 2 - 16, buttonY + buttonH / 2 + 5)
}

function buttonClicked() {
  let nextMove = getBestMove(getBoardData())
  if (nextMove[0] == undefined) {
    textSize(15)
    text("Invalid input", 54, 314)
  } else {
    for (let i = 9; i >= 0; i--) {
      if (board[i][0] == -1) {
        for (let j = 0; j < 4; j++) {
          board[i][j] = nextMove[0][j]
        }
        break
      }
    }
    candidatesLeft = nextMove[1]
    drawInterface()
  }
}

function getBoardData() {
  let output = []
  for (let i = 9; i >= 0; i--) {
    if (board[i][0] != -1) {
      output.push([board[i].slice(0, 4), board[i].slice(4, 6)])
    } else {
      break
    }
  }
  return output
}

function mousePressed() {
  if (validInput && mouseX >= buttonX && mouseX < buttonX + buttonW && mouseY >= buttonY && mouseY < buttonY + buttonH) {
    buttonClicked()
  }
}

function isValidInput() {
  let hasMetInput = false
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 6; j++) {
      if (hasMetInput) {
        if (board[i][j] == -1) {
          return false
        }
      } else {
        if (board[i][j] != -1) {
          if (j == 0) {
            hasMetInput = true
          } else {
            return false
          }
        }
      }
    }
  }
  return hasMetInput
}

function drawBoard(x_, y_) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 4; j++) {
      let x = (j + 0.5) * scale + j * spacing + x_
      let y = (i + 0.5) * scale + i * spacing + y_
      drawSlot(x, y, getColor(board[i][j]), board[i][j] == -1 ? undefined : board[i][j])
    }
  }
}

function drawInputs(x_, y_) {
  noFill()
  stroke(0)
  rect(x_, y_, 6 * scale + 7 * spacing, scale + 2 * spacing)
  noStroke()
  for (let i = 1; i <= 6; i++) {
    let x = (i - 0.5) * scale + i * spacing + x_
    let y = y_ + 0.5 * scale + spacing
    drawSlot(x, y, getColor(i), i)
  }
}

function drawHighlight(x_, y_) {
  fill(70)
  noStroke()
  let x = highlightJ * (scale + spacing) + x_
  let y = hightlightI * (scale + spacing) + y_
  rect(x - 1, y - 1, scale + 2, scale + 2, 5)
}

function drawClues(x_, y_) {
  for (i = 0; i <= 9; i++) {
    for (j = 0; j <= 1; j++) {
      let x = x_ + j * (scale + spacing) + 0.5 * scale
      let y = y_ + i * (scale + spacing) + 0.5 * scale
      drawSlot(x, y, j == 0 ? [255, 255, 255] : [100, 100, 100], board[i][j + 4] == -1 ? undefined : board[i][j + 4])
    }
  }
}

function drawSlot(x, y, color, label) {
  stroke(0)
  fill(color)
  ellipse(x, y, scale, scale)
  textSize(12)
  if (label != undefined) {
    fill(0)
    noStroke()
    text(label, x - 3, y + 4)
  }
}

function keyPressed() {
  switch (keyCode) {
    case 8:
      board[hightlightI][highlightJ] = -1
      break;
    case 37:
      highlightJ = max(highlightJ - 1, 0)
      break;
    case 39:
      highlightJ = min(highlightJ + 1, 5)
      break;
    case 38:
      hightlightI = max(hightlightI - 1, 0)
      break;
    case 40:
      hightlightI = min(hightlightI + 1, 9)
      break;
    case 49:
      board[hightlightI][highlightJ] = 1
      break;
    case 50:
      board[hightlightI][highlightJ] = 2
      break;
    case 51:
      board[hightlightI][highlightJ] = 3
      break;
    case 52:
      board[hightlightI][highlightJ] = 4
      break;
    case 53:
      if (highlightJ <= 3) {
        board[hightlightI][highlightJ] = 5
      }
      break;
    case 54:
      if (highlightJ <= 3) {
        board[hightlightI][highlightJ] = 6
      }
      break;
    case 48:
      if (highlightJ > 3) {
        board[hightlightI][highlightJ] = 0
      }
      break;
    case 13:
      if (validInput) {
        buttonClicked()
      }
      break;
  }
  drawInterface()
}

function getColor(type) {
  switch (type) {
    case -1:
      return [200, 200, 200]
      break;
    case 1:
      return [110, 129, 255]
      break;
    case 2:
      return [25, 224, 118]
      break;
    case 3:
      return [237, 155, 14]
      break;
    case 4:
      return [135, 9, 224]
      break;
    case 5:
      return [219, 15, 114]
      break;
    case 6:
      return [245, 252, 15]
      break;
  }
}