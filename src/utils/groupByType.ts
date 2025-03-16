export const groupByType = (array: any) => {
	return array.reduce((acc: any, obj: any) => {
	  const { type, ...rest } = obj;
	  
	  if (!acc[type]) {
		acc[type] = [];
	  }
	  
	  acc[type].push(rest);
	  
	  return acc;
	}, {});
  };