class ApiFeatures{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;

    }

    search(){
        const keyword=this.querystr.keyword?{
            name:{
                $regex:this.querystr.keyword,
                $options:"i"

            }
        }:{};
   
        this.query=this.query.find({...keyword})
        return this;

    }
    filter(){
        const queryCopy = { ...this.querystr };
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        
       
        // Filter For Price and Rating
    
        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        

        this.query = this.query.find(JSON.parse(querystr));
    
        return this;

    }
    pagination(resultPerPage){
        const currentpage=Number(this.querystr.page)||1;

        const skip=resultPerPage*(currentpage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;

    }

}
module.exports=ApiFeatures;