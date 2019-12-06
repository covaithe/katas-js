# katas-js


2019-12-05

Word Search kata from here:
https://github.com/PillarTechnology/kata-word-search

I've done an implementation like this maybe 10-20 times
over the last few weeks, and it's starting to feel pretty
smooth. I start with an acceptance test (pre-typed), mark it
ignored, then start by parsing the puzzle input into cells.
Usually I jump into the finder then, but this time I built
the utility methods on Cell and Path first instead, so that
I was able to use them in the tests for Finder and then the
Puzzle itself. I think that helped those tests be clearer
and easier to write.

To run the tests, do this:

```
npm install
npx jest
```