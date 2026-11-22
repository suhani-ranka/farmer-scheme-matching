import test from 'node:test';
import assert from 'node:assert/strict';
import { matchScheme } from '../src/services/matcher.js';

const baseScheme = {
  applicableStates: ['Madhya Pradesh'],
  tags: ['irrigation', 'drip'],
  eligibilityCaveats: ['Check the current notification.'],
  verificationStatus: 'official-source-checked',
  eligibilitySummary: 'State implementation rules apply.'
};

test('marks a same-state profile with a related interest as potentially relevant', () => {
  const result = matchScheme({ state: 'Madhya Pradesh', crops: [], interests: ['irrigation'], irrigation: 'partial', farmerType: 'small' }, baseScheme);
  assert.equal(result.potentiallyRelevant, true);
  assert.equal(result.stateMatches, true);
  assert.match(result.matchLabel, /Potentially relevant/);
});

test('does not mark a state-only scheme relevant for a different state', () => {
  const result = matchScheme({ state: 'Gujarat', crops: [], interests: ['irrigation'], irrigation: 'partial', farmerType: 'small' }, baseScheme);
  assert.equal(result.potentiallyRelevant, false);
  assert.equal(result.stateMatches, false);
  assert.match(result.matchLabel, /State not listed/);
});

test('includes a non-eligibility disclaimer in caveats', () => {
  const result = matchScheme({ state: 'Madhya Pradesh', crops: [], interests: ['irrigation'], irrigation: 'partial', farmerType: 'small' }, baseScheme);
  assert.ok(result.caveats.some(item => item.includes('not a government eligibility decision')));
});
