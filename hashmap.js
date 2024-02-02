const HashMap = (initialSize = 16) => {
  let buckets = new Array(initialSize).fill(null);
  let size = 0;
  const loadFactor = 0.75;

  // Calculates a hash code for a given string 
  // using a specific hashing algorithm
  const hash = (string) => {
    return stringToNumber(string);
  };

  // Converts a string into a numerical hash 
  // code based on its characters
  const stringToNumber = (string) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let char of string) {
      hashCode = primeNumber * hashCode + char.charCodeAt(0);
    }

    return hashCode;
  };

  // Resizes the buckets array and rehashes all existing entries to
  // maintain the hash map's load factor within acceptable limits
  const resizeAndRehash = () => {
    const newBuckets = new Array(buckets.length * 2).fill(null);

    size = 0;

    buckets.forEach(bucket => {
      if (bucket) {
        bucket.forEach(({ key, value }) => {
          const index = hash(key) % newBuckets.length;
          if (newBuckets[index]) {
            newBuckets[index].push({ key, value });
          } else {
            newBuckets[index] = [{ key, value }];
          }
          size++;
        });
      }
    });

    buckets = newBuckets;
  };

  // Determines the appropriate bucket for
  // a given key based on its hash code
  const getBucketFor = (key) => {
    const index = hash(key) % buckets.length;
    return { index, bucket: buckets[index] };
  };

  // Inserts or updates a key-value pair in the hash map. If the map's
  // load factor exceeds a defined threshold, it triggers resizing.
  const set = (key, value) => {
    // Check if adding a new entry requires resizing
    if ((size + 1) / buckets.length > loadFactor) {
      resizeAndRehash();
    }

    const { index, bucket } = getBucketFor(key);
    let found = false;

    if (bucket) {
      // Check if the key exists and update the value if it exists
      for (let entry of bucket) {
        if (entry.key === key) {
          entry.value = value;
          found = true;
          break;
        }
      }
    }

    if (!found) {
      // Initialize bucket if it's null
      if (!buckets[index]) buckets[index] = [];
      buckets[index].push({ key, value });
      size++;
    }
  };

  // Retrieves the value associated with a given key. 
  // Returns null if the key is not found.
  const get = (key) => {
    const { bucket } = getBucketFor(key);

    if (bucket) {
      for (let entry of bucket) {
        if (entry.key === key) {
          return entry.value;
        }
      }
    }

    return null;
  };

  // Checks if a given key exists in the hash map. 
  // Returns true if the key is found, otherwise false.
  const has = (key) => {
    const { bucket } = getBucketFor(key);

    // Return false immediately if bucket is empty
    if (!bucket) return false;

    for (let entry of bucket) {
      if (entry.key === key) {
        return true;
      }
    }
    return false;
  };

  // Removes a key-value pair from the hash map based on the key. 
  // Decrements the size and returns true if successful, otherwise false.
  const remove = (key) => {
    const { bucket } = getBucketFor(key);

    if (bucket) {
      const index = bucket.findIndex(entry => entry.key === key);
      if (index !== -1) {
        bucket.splice(index, 1);
        size--;
        return true;
      }
    }
    return false;
  };

  // Returns the number of key-value pairs stored in the hash map
  const length = () => {
    let keysCount = 0;

    buckets.forEach(bucket => {
      if (bucket) {
        keysCount += bucket.length;
      }
    });
    return keysCount;
  };

  // Clears all key-value pairs from the hash map, resetting its size
  const clear = () => {
    buckets = new Array(initialSize).fill(null);
    size = 0;
  };

  // Returns an array of all keys currently stored in the hash map
  const keys = () => {
    let keysArray = [];

    buckets.forEach(bucket => {
      if (bucket) {
        bucket.forEach(entry => {
          keysArray.push(entry.key);
        });
      }
    });
    return keysArray;
  };

  // Returns an array of all values currently stored in the hash map
  const values = () => {
    let valuesArray = [];

    buckets.forEach(bucket => {
      if (bucket) {
        bucket.forEach(entry => {
          valuesArray.push(entry.value);
        });
      }
    });
    return valuesArray;
  };

  // Returns an array of all entries ([key, value] pairs) 
  // currently stored in the hash map
  const entries = () => {
    let entriesArray = [];

    buckets.forEach(bucket => {
      if (bucket) {
        bucket.forEach(entry => {
          entriesArray.push([entry.key, entry.value]);
        });
      }
    });
    return entriesArray;
  };

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries
  };
};


//======================== TEST CODE ==========================//

// Initialize a new HashMap instance
const hashMap = HashMap();

// Test 'set' method
hashMap.set('apple', 5);
hashMap.set('banana', 10);
hashMap.set('orange', 15);
console.log('After setting apple, banana, and orange:');
console.log('Expected length 3, Actual length:', hashMap.length());

// Test 'get' method
console.log('Get value for key "apple" (Expected: 5):', hashMap.get('apple'));
console.log('Get value for key "banana" (Expected: 10):', hashMap.get('banana'));

// Test 'has' method
console.log('Check if key "orange" exists (Expected: true):', hashMap.has('orange'));
console.log('Check if key "grape" exists (Expected: false):', hashMap.has('grape'));

// Test updating an existing key
hashMap.set('apple', 20);
console.log('Value for "apple" after update (Expected: 20):', hashMap.get('apple'));

// Test 'remove' method
hashMap.remove('banana');
console.log('After removing "banana":');
console.log('Check if key "banana" exists (Expected: false):', hashMap.has('banana'));
console.log('Expected length 2, Actual length:', hashMap.length());

// Test 'keys' method
console.log('Keys in hashMap (Expected: ["apple", "orange"]):', hashMap.keys());

// Test 'values' method
console.log('Values in hashMap (Expected: [20, 15]):', hashMap.values());

// Test 'entries' method
console.log('Entries in hashMap (Expected: [["apple", 20], ["orange", 15]]):', hashMap.entries());

// Test 'clear' method
hashMap.clear();
console.log('After clearing the hashMap:');
console.log('Expected length 0, Actual length:', hashMap.length());
console.log('Check if key "apple" exists (Expected: false):', hashMap.has('apple'));
