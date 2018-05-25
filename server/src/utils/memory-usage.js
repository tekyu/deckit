var memory_usage = {
    unit: ['', 'K', 'M', 'G', 'T', 'P'],
    
    bytesToSize: function(input, precision) {
        var index = Math.floor(Math.log(input) / Math.log(1024));
        if (this.unit >= this.unit.length) return input + ' B';
        return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + this.unit[index] + 'B'            
    },
    
    testUsage: function() {
        const _this = this;
        const usage  = process.memoryUsage(); 
        console.log('==================================');
        console.log('  Empty Node Module Memory Usage  ');
        console.log('==================================');
        
        setInterval(function() {
            console.log('RSS: ' + _this.bytesToSize(usage.rss, 3), 'and Heap:', _this.bytesToSize(usage.heapUsed, 3), 'of', _this.bytesToSize(usage.heapTotal, 3), 'total');
        }, 1000);        
    }
}
module.exports =  memory_usage;