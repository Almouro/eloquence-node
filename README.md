Eloquence NodeJS Backend
========================

This is the backend for <a href="https://github.com/Almouro/eloquence-mobile">Eloquence</a>.

_One of the files ('parser.jar') is missing in this repo because of GitHub size limitations_

It provides a single API /sentence/{"sentence": sentence, words:[word1..wordn]}
to retrieve:
  - synonyms for word1 to wordn 
  - parsing for the sentence (which word is noun, verb...)
  
The Eloquence frontend stores words synonyms locally, so it can specify which words needs synonyms data.
  
Example: [Sentence: "My cat is very happy", Words: ["cat", "happy"]](http://eloquence-node.herokuapp.com/sentence/%7B%22sentence%22:%22my%20cat%20is%20very%20happy%22,%22words%22:[%22cat%22,%20%22happy%22]%7D)

##Process

The 'sentence-processor' module launches multiple parallel asynchronous tasks and then return the results in a json file:
  - Getting synonyms for each word given
  - Parsing the sentence

It was a great chance to test NodeJS and its asynchronous nature.

###Getting synonyms
The 'synonyms' module calls thesaurus.com to retrieve synonym information.

thesaurus.com does not provide a public API yet so the module is actually parsing raw HTML.

###Parsing the sentence
The 'sentence-parser' module is a nodejs wrapper for the [Java Stanford Parser](http://nlp.stanford.edu/software/lex-parser.shtml)

It's probably not the best idea but it's efficient enough and suited the needs of the apps.

