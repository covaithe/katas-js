class Strike {
  constructor() {
    this.rollsNeeded = 2
  }

  needsRolls() {
    return this.rollsNeeded > 0
  }

  acceptRoll() {
    this.rollsNeeded -= 1
  }
}

class Spare {
  constructor() {
    this.needsRoll = true
  }

  needsRolls() {
    return this.needsRoll
  }

  acceptRoll() {
    this.needsRoll = false
  }
}

export class Game {
  constructor() {
    this.score = 0
    this.pendingMarks = []
    this.completedFrames = 0
    this.firstRollOfFrame = null
  }
  isComplete() {
    return this.completedFrames >= 10
  }

  markFrameComplete() {
    this.firstRollOfFrame = null
    this.completedFrames += 1
  }

  hasFrameInProgress() {
    return this.firstRollOfFrame !== null
  }

  roll(roll) {
    this.pendingMarks.forEach((mark) => {
      if (mark.needsRolls()) {
        this.score += roll
        mark.acceptRoll()
      }
    })

    if (this.isComplete()) return

    this.score += roll

    if (this.hasFrameInProgress()) {
      if (this.firstRollOfFrame + roll === 10) {
        this.pendingMarks.push(new Spare())
      }

      this.markFrameComplete()
    } else {
      this.firstRollOfFrame = roll

      if (roll === 10) {
        this.pendingMarks.push(new Strike())
        this.markFrameComplete()
      }
    }
  }
}
