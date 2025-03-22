export const groupByType = (array) => {
	return array.reduce((acc, obj) => {
	  const { type, ...rest } = obj;
	  
	  if (!acc[type]) {
		acc[type] = [];
	  }
	  
	  acc[type].push({ type, ...rest });
	  
	  return acc;
	}, {});
  };