import fs from 'fs';
import pathUtil from 'path';

function copyFile(src, dist) {
    fs.writeFileSync(dist, fs.readFileSync(src), {flag:'w+'});
}

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, filter) {
    try{
        fs.accessSync(dist);
    }catch(err){
        fs.mkdirSync(dist);
    }
    _copy(src, dist, filter);
    
    function _copy(src, dist, filter) {
        try{
            let paths = fs.readdirSync(src);
            paths.forEach(function(path) {
                let _src = pathUtil.join(src, '/', path);
                let _dist = pathUtil.join(dist, '/', path);
                //try block required here, but anyways
                let stat = fs.statSync(_src);

                // 判断是文件还是目录
                if(stat.isFile()) {
                    if(filter(true,_src,_dist)){
                        copyFile(_src,_dist);
                    }
                } else if(stat.isDirectory()) {
                    // 当是目录是，递归复制
                    if(filter(false,_src,_dist)){
                        copyDir(_src, _dist, filter);
                    }
                }
            });
        }catch(err){
            throw err;
        }
    }
}

export {copyFile, copyDir};