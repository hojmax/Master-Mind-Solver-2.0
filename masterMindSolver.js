const allMoves = getAllMoves()
const allClues = getAllClues()
let currentCandidates = []

function getAllClues() {
  let output = []
  for (let white = 0; white <= 4; white++) {
    for (let black = 0; black <= 4; black++) {
      if (white + black <= 4) {
        output.push([white, black])
      } else {
        break
      }
    }
  }
  return output
}

function getAllMoves() {
  let output = []
  for (let a = 1; a <= 6; a++) {
    for (let b = 1; b <= 6; b++) {
      for (let c = 1; c <= 6; c++) {
        for (let d = 1; d <= 6; d++) {
          output.push([a, b, c, d])
        }
      }
    }
  }
  return output
}

function getBestMove(history) {
  let candidates = allMoves
  for (e of history) {
    candidates = getPossibleAnswers(candidates, e[0], e[1])
  }
  if (candidates.length == 0) {
    return [undefined, 0]
  } else {
    let lowestScore = Infinity
    let bestMove = []
    for (move of candidates) {
      let score = getMoveScore(move, candidates)
      if (score < lowestScore) {
        lowestScore = score
        bestMove = move
      }
    }
    return [bestMove, candidates.length]
  }
}

function getMoveScore(move, candidates) {
  let score = 0
  let validCases = 0
  for (clue of allClues) {
    let followingOptions = getPossibleAnswers(candidates, move, clue).length
    if (followingOptions > 0) {
      score += followingOptions
      validCases++
    }
  }
  return score / validCases
}

function getPossibleAnswers(possibilities, move, clue) {
  let output = []
  for (e of possibilities) {
    let candidateClue = getClue(move, e)
    if (candidateClue[0] == clue[0] && candidateClue[1] == clue[1]) {
      output.push(e)
    }
  }
  return output
}

function getClue(guess, correct) {
  let black = 0
  let white = 0
  let l1 = guess.slice()
  let l2 = correct.slice()
  for (let i = 3; i >= 0; i--) {
    if (l1[i] == l2[i]) {
      l1.splice(i, 1)
      l2.splice(i, 1)
      black++
    }
  }
  for (let i = l1.length - 1; i >= 0; i--) {
    for (let j = l2.length - 1; j >= 0; j--) {
      if (l1[i] == l2[j]) {
        l1.splice(i, 1)
        l2.splice(j, 1)
        white++
        break
      }
    }
  }
  return [white, black]
}