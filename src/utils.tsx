interface rawMetaData {
  label:string,
  images:Array<string>, 
  modality: string,
  id:number
}
export interface MetaData {
  thumbnail:string,
  label:string,
  id:number,
  modality:string,
  prefix:string, 
  suffix: string,
  start_slice:number,
  end_slice : number,
  ww:number,
  wc:number,
  ci:number,
  z:number,
  px:number,
  py:number,
  r:number,
  cord:number[]
}



function longestCommonPrefix(strs:Array<string>) {
  if (strs.length === 0) return "";

  strs.sort();

  let prefix = "";
  let first = strs[0];
  let last = strs[strs.length - 1];

  for (let i = 0; i < first.length; i++) {
      if (first[i] === last[i]) {
          prefix += first[i];
      } else {
          break;
      }
  }

  return prefix;
}
function longestCommonSuffix(strs:Array<string>) {
  const reversedStrs = strs.map(str => str.split("").reverse().join(""));
  const suffix = longestCommonPrefix(reversedStrs);
  return suffix.split("").reverse().join("");
}

export function generateMetaData(list:Array<rawMetaData>) {
    var objs = list.map(x => ({ 
        thumbnail: x.images[0],
        label:x.label,
        modality:x.modality,
        id:x.id,
        prefix: longestCommonPrefix(x.images), 
        suffix: longestCommonSuffix(x.images),
        start_slice:1,
        end_slice : x.images.length,
        ww:1400,
        wc:1200,
        ci:0,
        z:1,
        px:0,
        py:0,
        r:0,
        cord:[-1,-1]
      }));
    return objs

};

export function generateURL(data:MetaData){
  const URL_genereated  = new URL("https://attheviewbox.github.io/TemplateStaticCornerstone3DViewport/");

  URL_genereated.searchParams.append("m", "true");
  URL_genereated.searchParams.append("ld.r", "1");
  URL_genereated.searchParams.append("ld.c", "1");

  URL_genereated.searchParams.append("vd.0.s.pf", encodeURI("dicomweb:"+data.prefix));
  URL_genereated.searchParams.append("vd.0.s.sf", data.suffix);
  URL_genereated.searchParams.append("vd.0.s.s", data.start_slice.toString());
  URL_genereated.searchParams.append("vd.0.s.e", data.end_slice.toString());
  URL_genereated.searchParams.append("vd.0.ww", data.ww.toString());
  URL_genereated.searchParams.append("vd.0.wc", data.wc.toString());

  URL_genereated.searchParams.append("vd.0.ci", data.ci.toString());
  URL_genereated.searchParams.append("vd.1.z", data.z.toString());
  URL_genereated.searchParams.append("vd.1.px", data.px.toString());
  URL_genereated.searchParams.append("vd.1.py", data.py.toString());
  URL_genereated.searchParams.append("vd.1.r", data.r.toString());
  return URL_genereated.href


}
export function generateGridURL(metaDataList:MetaData[],row:number,col:number){
  const URL_genereated  = new URL("https://attheviewbox.github.io/TemplateStaticCornerstone3DViewport/");

  URL_genereated.searchParams.append("m", "true");
  URL_genereated.searchParams.append("ld.r", row.toString());
  URL_genereated.searchParams.append("ld.c", col.toString());

  metaDataList.map((data)=>{
    if (data.cord[0]!=-1 && data.cord[1]!=-1){
      let value = (((data.cord[0]+1)+(col*(data.cord[1])))-1).toString()
    URL_genereated.searchParams.append("vd."+value+".s.pf", encodeURI("dicomweb:"+data.prefix));
    URL_genereated.searchParams.append("vd."+value+".s.sf", data.suffix);
    URL_genereated.searchParams.append("vd."+value+".s.s", String(data.start_slice).padStart(3, '0'));
    URL_genereated.searchParams.append("vd."+value+".s.e",String(data.end_slice).padStart(3, '0'));
    URL_genereated.searchParams.append("vd."+value+".ww", data.ww.toString());
    URL_genereated.searchParams.append("vd."+value+".wc", data.wc.toString());
  
    URL_genereated.searchParams.append("vd."+value+".ci", data.ci.toString());
    URL_genereated.searchParams.append("vd."+value+".z", data.z.toString());
    URL_genereated.searchParams.append("vd."+value+".px", data.px.toString());
    URL_genereated.searchParams.append("vd."+value+".py", data.py.toString());
    URL_genereated.searchParams.append("vd."+value+".r", data.r.toString());
    }


  })

  console.log(URL_genereated.href)
  return URL_genereated.href


}
/**"https://s3.amazonaws.com/elasticbeanstalk-us-east-1-843279806438/dicom/production/-ywXf2R16d_1.3.12.2.1107.5.1.4.73513.30000019073108281347500001430/1.dcm.gz"
"https://s3.amazonaws.com/elasticbeanstalk-us-east-1-843279806438/dicom/production/-ywXf2R16d_1.3.12.2.1107.5.1.4.73513.30000019073110243989500021595/001.dcm.gz"
"https://s3.amazonaws.com/elasticbeanstalk-us-east-1-843279806438/dicom/production/-ywXf2R16d_1.3.12.2.1107.5.1.4.73513.30000019073110243989500022713/101.dcm.gz"


https://attheviewbox.github.io/TemplateStaticCornerstone3DViewport/?m=true&
ld.r=1&
ld.c=1&
vd.0.s.pf=dicomweb%3Ahttps%3A%2F%2Fs3.amazonaws.com%2Felasticbeanstalk-us-east-1-843279806438%2Fdicom%2Fproduction%2F-ywXf2R16d_1.3.12.2.1107.5.1.4.73513.30000019073110243989500020904%2F&
vd.0.s.sf=.dcm.gz&
vd.0.s.s=101&
vd.0.s.e=130&
vd.0.ww=1400&
vd.0.wc=1200&
vd.0.ci=0&
vd.1.z=1&
vd.1.px=0&
vd.1.py=0&
vd.1.r=0

https://attheviewbox.github.io/TemplateStaticCornerstone3DViewport/?m=true&
ld.r=2&ld.c=3&
vd.0.s.pf=dicomweb%3Ahttps%3A%2F%2Fs3.amazonaws.com%2Felasticbeanstalk-us-east-1-843279806438%2Fdicom%2Fproduction%2F-ywXf2R16d_1.3.12.2.1107.5.1.4.73513.30000019073110243989500020904%2F&
vd.0.s.sf=.dcm.gz&
vd.0.s.s=460&
vd.0.s.e=541&
vd.0.ww=1400&
vd.0.wc=1200&
vd.0.ci=0&
vd.0.z=1&
vd.0.px=0&
vd.0.py=0&v
d.0.r=0&
vd.2.s.pf=dicomweb%3Ahttps%3A%2F%2Fs3.amazonaws.com%2Felasticbeanstalk-us-east-1-843279806438%2Fdicom%2Fproduction%2F-ywXf2R16d_1.3.12.2.1107.5.1.4.73513.30000019073110243989500021446%2F&
vd.2.s.sf=.dcm.gz&
vd.2.s.s=128&
vd.2.s.e=148&
vd.2.ww=1400&
vd.2.wc=1200&
vd.2.ci=0&
vd.2.z=1&
vd.2.px=0&
vd.2.py=0&
vd.2.r=0&
vd.2.s.pf=dicomweb%3Ahttps%3A%2F%2Fs3.amazonaws.com%2Felasticbeanstalk-us-east-1-843279806438%2Fdicom%2Fproduction%2F-ywXf2R16d_1.3.12.2.1107.5.1.4.73513.30000019073110243989500021595%2F&vd.2.s.sf=.dcm.gz&vd.2.s.s=184&vd.2.s.e=215&vd.2.ww=1400&vd.2.wc=1200&vd.2.ci=0&vd.2.z=1&vd.2.px=0&vd.2.py=0&vd.2.r=0*/