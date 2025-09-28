export const useBranchBatchProcessor = (
  updateBranchesStatusFunction,
  data,
  batchSize = 3
) => {
  const processBranchesInBatches = async (branchesToProcess) => {
    let successCount = 0;
    let failureCount = 0;

    // Create a copy of the array to avoid modifying the original
    const remainingBranches = [...branchesToProcess];

    while (remainingBranches.length > 0) {
      // Take the next batch of branches
      const currentBatch = remainingBranches.splice(0, batchSize);

      // Create promises for the current batch
      const batchPromises = currentBatch.map((branch) =>
        updateBranchesStatusFunction(branch.id, data)
      );

      // Execute the batch, and count the successes and failures
      const results = await Promise.allSettled(batchPromises);

      // Count successes and failures
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value?.status === 200)
          successCount++;
        else failureCount++;
      });
    }

    return { successCount, failureCount };
  };

  return {
    processBranchesInBatches,
  };
};
