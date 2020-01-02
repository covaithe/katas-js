# katas-js

2020-01-02

This is an implementation of the
Word Search kata from here:
https://github.com/PillarTechnology/kata-word-search

To run the tests, do this:

```
npm install
npx jest
```

Previously I'd been working on bottom-up approaches to the kata, such as this:
https://github.com/covaithe/katas-js/tree/word-search/2019-12-05

Since then I've been trying to do a top-down approach instead, for a few reasons.
For one, I wanted to see how it was different; what it felt like. For another, I think
top-down is more like how I approach real problems in client projects. Top-down leads
to more opportunites for refactoring, which is something that I'd noticed was missing from
my bottom-up approach.

Today's kata is the first time (out of maybe five attempts) where I felt like the top-down
approach was reasonably successful and resulted in code I'm happy with. Some random observations:

* there are fewer tests. Each test drove a fair amount of implementation code. I think
  I'd like to try to work on this; maybe I could take smaller steps.
* on the other hand, the tests tell a fairly clear story. They make sense without knowledge of
  the implementation, and they describe the shape of the solution in a fairly natural way. I'm
  happy with this.
* There's still plenty of work to do to make this smooth.