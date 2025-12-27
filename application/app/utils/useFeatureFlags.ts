import { useSearchParams } from 'react-router';

export const useFeatureFlags = (): FeatureMap => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('features');

  if (query === null) {
    return {};
  }

  const paramFeatures = query.split(',').map((f) => f.trim().toLowerCase());

  return paramFeatures.reduce((featureMap, feature) => {
    featureMap[feature] = true;
    return featureMap;
  }, {} as FeatureMap);
};
