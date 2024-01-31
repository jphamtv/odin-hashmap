if (index < 0 || index >= buckets.length) {
  throw new Error('Trying to access index out of bound');
}

const HashMap = () => {
  let buckets = new Array(16).fill(null);
  let size = 0;
  const loadFactor = 0.75;

  const hash = (string) => {
    return stringToNumber(string);
  };

  const stringToNumber = (string) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }

    return hashCode;
  };

  const resizeAndRehash = () => {
    const newBuckets = new Array(buckets.length * 2).fill(null);
    buckets.forEach(bucket => {
      if (bucket) {
        bucket.forEach(({ key, value}) => {
          const index = hash(key) % newBuckets.length;
          if (newBuckets[index]) {
            newBuckets[index].push({ key, value });
          } else {
            newBuckets[index] = [{ key, value}];
          }
        });
      }
    });

    buckets = newBuckets;
  };

  const set = (key, value) => {
    const index = hash(key) % buckets.length;
    const bucket = buckets[index];

    if (bucket) {
      // Check if the key exists and update the value
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          bucket[i].value = value;
          return;
        }
      }
      // If the key doesn't exist, add it to the bucket
      bucket.push({key, value});
    } else {
      // If the bucket is empty, initialize it with the new key-value pair
      buckets[index] = [{ key, value }];
    }

    size++;
    if (size / buckets.length > loadFactor) {
      resizeAndRehash();
    }
  };

  const get = (key) => {
    const index = hash(key) % buckets.length;
    const bucket = buckets[index];
     
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          return bucket[i].value;
        } 
      }
    }

    return null;
  };

  const has = (key) => {};

  const remove = (key) => {};

  const length = () => {};

  const clear = () => {};

  const keys = () => {};

  const values = () => {};

  const entries = () => {};

};









// ===============================================================//

function stringToNumber(string) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < string.length; i++) {
    hashCode = primeNumber * hashCode + string.charCodeAt(i);
  }

  return hashCode;
}


function hash(name, surname) {
  return stringToNumber(name) + stringToNumber(surname);
}

const name = hash('John', 'Smith');
console.log(name);
