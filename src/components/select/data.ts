const options: { id: number; name: string }[] = [];

for (let i = 1; i <= 10; i++) {
  options.push({
    id: i,
    name: `Item ${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo`,
  });
}

export default options;
