var test = require('tape')
var Pitch = require('../lib/pitch.js')

test('new Pitches can be created', function (t) {
  var pitch_Bb4 = new Pitch('Bb4')

  t.equal(pitch_Bb4.name, 'Bb4')
  t.true(pitch_Bb4 instanceof Pitch, 'is instance of Pitch')

  pitch_Bb4.name = 'E4'
  t.equal(pitch_Bb4.name, 'Bb4', 'Pitch is immutable')

  pitch_Bb4.test = 'testing'
  t.equal(typeof pitch_Bb4.test, 'undefined', 'Pitch is immutable')

  t.end()
})

test('Pitch.toString() generates the correct string', function (t) {
  t.equal((new Pitch('Bb5')).toString(), 'Bb5')

  var harmonic = 'C#3 D#3 E3 F#3 G#3 A3 B#3 C#4'
  var mapped = harmonic.split(' ').map(function (pitch) {
    return new Pitch(pitch)
  }).join(' ')
  t.equal(mapped, harmonic, 'toString is being called automatically')

  t.end()
})

test('Pitch prototype parsing methods', function (t) {
  var pitch_Bbb2 = new Pitch('Bbb2')

  t.equal(pitch_Bbb2.sciPitch(), 'Bbb2', 'Pitch.sciPitch() returns correctly')
  t.equal(pitch_Bbb2.letter(), 'B', 'Pitch.letter() returns correctly')
  t.equal(pitch_Bbb2.accidental(), 'bb', 'Pitch.accidental() returns correctly')
  t.equal(pitch_Bbb2.octave(), 2, 'Pitch.octave() returns correctly')
  t.equal(pitch_Bbb2.pitchClass(), 'Bbb', 'Pitch.pitchClass() returns correctly')
  t.equal(pitch_Bbb2.midi(), 45, 'Pitch.midi() returns correctly')

  var pitch_D = new Pitch('D')
  t.equal(pitch_D.accidental(), '', 'Pitch.accidental() returns correctly with empty string')

  t.end()
})

test('Pitch.numAccidental() returns the correct number', function (t) {
  t.equal((new Pitch('A##9')).numAccidental(), 2)
  t.equal((new Pitch('G#2')).numAccidental(), 1)
  t.equal((new Pitch('F4')).numAccidental(), 0)
  t.equal((new Pitch('Bb3')).numAccidental(), -1)
  t.equal((new Pitch('Dbb7')).numAccidental(), -2)

  t.end()
})
