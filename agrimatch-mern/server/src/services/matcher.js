const normal = value => String(value || '').trim().toLowerCase();

export function matchScheme(profile, scheme) {
  const reasons = [];
  const caveats = [...(scheme.eligibilityCaveats || [])];
  const applicable = scheme.applicableStates || [];
  const isNationwide = applicable.some(s => normal(s) === 'all india');
  const stateMatches = isNationwide || applicable.some(s => normal(s) === normal(profile.state));

  if (stateMatches) {
    reasons.push(isNationwide
      ? 'The scheme is listed as applicable across India.'
      : `The scheme is listed for ${profile.state}.`);
  } else {
    reasons.push(`The selected state (${profile.state}) is not listed in this scheme record.`);
  }

  const profileTags = [
    ...(profile.crops || []).map(normal),
    ...(profile.interests || []).map(normal),
    normal(profile.irrigation),
    normal(profile.farmerType)
  ];
  const schemeTags = [
    ...(scheme.tags || []),
    ...(scheme.cropTags || []),
    ...(scheme.irrigationTags || []),
    ...(scheme.farmerTypeTags || [])
  ].map(normal).filter(Boolean);
  const relevantTags = schemeTags.filter(tag => profileTags.some(p => p.includes(tag) || tag.includes(p)));

  if (relevantTags.length) {
    reasons.push(`Your profile shares these topic(s): ${[...new Set(relevantTags)].join(', ')}.`);
  }
  if (scheme.eligibilitySummary) reasons.push(scheme.eligibilitySummary);

  if (!stateMatches) caveats.push('This scheme is not listed for the selected state in the current catalogue.');
  if (scheme.verificationStatus !== 'official-source-checked') {
    caveats.push('This record needs a fresh official-source review.');
  }
  caveats.push('This is a discovery suggestion, not a government eligibility decision.');

  return {
    potentiallyRelevant: stateMatches && (relevantTags.length > 0 || schemeTags.length === 0),
    stateMatches,
    reasons,
    caveats,
    matchLabel: !stateMatches ? 'State not listed — check source' : (relevantTags.length || schemeTags.length === 0 ? 'Potentially relevant — verify details' : 'No topic match detected — explore manually')
  };
}
