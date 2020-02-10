# katas-js

This is an implementation of the
Word Search kata from here:
https://github.com/PillarTechnology/kata-word-search

To run the tests, do this:

```
npm install
npx jest
```

2020-02-10

Today's implementation is another attempt at doing the problem in a functional
programming style. I'm starting to get comfortable with it, and feel like there's
some good stuff here.

The interesting thing about today's effort, as compared with previous ones, is that
John Gartee talked me into setting my editor up in a way that it can automatically
commit each time I run the tests, and capture the test output into the commit message.
That way someone attempting to read the kata can either look at the finished product,
or use the commits on this branch as a step-by-step guide to follow how I got from
the starting point to the finish.

My editor config for this isn't perfect, and does introduce a certain amount of friction
into my flow. I think I could improve on it, but...  I'm not sure I want to build these keystrokes
into my muscle memory. I'm struggling to think of how it would help me in real code to commit on every test run. I guess I'd get real good at squashing commits? IDK. I'll think about it.