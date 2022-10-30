type AsyncRetryProps = {
  funcToTry: () => Promise<boolean>;
  onSuccess?: () => void;
  onFailure?: () => void;
  maxTries?: number;
};

export const asyncRetry = async ({
  funcToTry,
  onSuccess,
  onFailure,
  maxTries = 3,
}: AsyncRetryProps) => {
  let functionRanSuccessfully = false;
  let tryCount = 0;
  while (!functionRanSuccessfully && tryCount < maxTries) {
    const result = await funcToTry();
    if (result) {
      onSuccess && onSuccess();
    }

    if (!result) {
      onFailure && onFailure();
    }
    functionRanSuccessfully = result;
    tryCount++;
  }
};
