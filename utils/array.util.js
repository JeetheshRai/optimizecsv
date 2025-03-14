

class arrayUtil {
    splitArray(array, chunkSize) {
        if (!Array.isArray(array)) throw new Error("Input must be an array");
        if (chunkSize <= 0) throw new Error("Chunk size must be greater than 0");

        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            result.push(chunk);
        }
        return result;
    }
}

module.exports = new arrayUtil();