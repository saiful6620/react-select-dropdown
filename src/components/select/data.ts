const options: { id: number; name: string }[] = [];

for (let i = 1; i <= 50; i++) {
  options.push({
    id: i,
    name: `Item ${i}`,
  });
}

export default options;
