/**
 * Title: EquiLeader
 * Question: https://app.codility.com/programmers/lessons/8-leader/equi_leader/
 */

function solution(A) {
  if (A.length < 2) return 0;

  // Stack technique of finding the leader of an array,
  // see Section 8.3 in the reading material at:
  // https://codility.com/media/train/6-Leader.pdf
  let stackSize = 1;
  let stackTop = A[0];

  for (let i = 1; i < A.length; i++) {
    if (stackSize === 0) {
      stackSize++;
      stackTop = A[i];
    } else if (A[i] === stackTop) {
      stackSize++;
    } else {
      stackSize--;
    }
  }

  let leader = undefined;
  let candidateOccurrenceCount = 0;

  if (stackSize > 0) {
    const leaderCandidate = stackTop;

    for (let i = 0; i < A.length; i++) {
      if (A[i] === leaderCandidate) {
        candidateOccurrenceCount++;
      }
    }

    if (candidateOccurrenceCount > A.length / 2) {
      leader = leaderCandidate;
    }
  }

  /**
   * Traverse the array one more time.
   *
   * Count the number of times the leader is encountered (`leaderCount`).
   *
   * Keep in mind that the current value of `leaderCount` represents
   * the number of leaders in the left half of the array.
   * Also the value of `candidateOccurrenceCount` represents the total number
   * of times that the leader appears in the entire array A.
   *
   * Check for equiLeader by checking if the following two conditions
   * are both satisfied:
   * 1. leaderCount is larger than half the length of the left half
   * ie,. `leaderCount > (i + 1) / 2`
   * 2. candidateOccurrenceCount - leaderCount represents the number of
   * occurrences of leader in the right half, while `A.length - i - 1`
   * represents the length of the right half. Check if the former is
   * larger than half the latter,
   * ie., `candidateOccurrenceCount - leaderCount > (A.length - i - 1) / 2`
   *
   * If both conditions are satisfied, count that as an equi-leader.
   */
  let leaderCount = 0;
  let equiLeaderCount = 0;

  for (let i = 0; i < A.length; i++) {
    if (A[i] === leader) {
      leaderCount++;
    }

    if (
      leaderCount > (i + 1) / 2 &&
      candidateOccurrenceCount - leaderCount > (A.length - i - 1) / 2
    ) {
      equiLeaderCount++;
    }
  }

  return equiLeaderCount;
}
