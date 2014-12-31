Eloquence NodeJS Backend
========================

This is the backend for <a href="https://github.com/Almouro/eloquence-mobile">Eloquence</a>.

It provides a single API /sentence/{"sentence": sentence, words:[word1..wordn]}
to retrieve:
  - synonyms for word1 to wordn 
  - parsing for the sentence (which word is noun, verb...)
  
The Eloquence frontend stores words synonyms locally, so it can specify which words needs synonyms data.
  
Example: http://eloquence-node.herokuapp.com/sentence/{"sentence":"my cat is very happy","words":["cat", "happy"]}
