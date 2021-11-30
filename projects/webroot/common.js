// XLEN - register width
export var Xlen;
(function (Xlen) {
    Xlen[Xlen["word"] = 32] = "word"; // bits
})(Xlen || (Xlen = {}));
// VCOUNT - vcore count
export var Vcount;
(function (Vcount) {
    Vcount[Vcount["one"] = 1] = "one";
})(Vcount || (Vcount = {}));
// MRCOUNT - max registers count
export var Mrcount;
(function (Mrcount) {
    Mrcount[Mrcount["default"] = 128] = "default";
})(Mrcount || (Mrcount = {}));
// MEMPOW - powers of 2 for memory length
export var Mempow;
(function (Mempow) {
    Mempow[Mempow["min"] = 16] = "min";
    Mempow[Mempow["med"] = 24] = "med";
    Mempow[Mempow["max"] = 32] = "max";
})(Mempow || (Mempow = {}));
// VNUM - vcore number
export var Vnum;
(function (Vnum) {
    Vnum[Vnum["zero"] = 0] = "zero";
})(Vnum || (Vnum = {}));
// IALIGN - instruction alignment
export var Ialign;
(function (Ialign) {
    Ialign[Ialign["word"] = 32] = "word";
})(Ialign || (Ialign = {}));
// ILEN - instruction length
export var Ilen;
(function (Ilen) {
    Ilen[Ilen["word"] = 32] = "word";
})(Ilen || (Ilen = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx3QkFBd0I7QUFDeEIsTUFBTSxDQUFOLElBQVksSUFFWDtBQUZELFdBQVksSUFBSTtJQUNkLGdDQUFTLENBQUEsQ0FBQyxPQUFPO0FBQ25CLENBQUMsRUFGVyxJQUFJLEtBQUosSUFBSSxRQUVmO0FBRUQsdUJBQXVCO0FBQ3ZCLE1BQU0sQ0FBTixJQUFZLE1BRVg7QUFGRCxXQUFZLE1BQU07SUFDaEIsaUNBQU8sQ0FBQTtBQUNULENBQUMsRUFGVyxNQUFNLEtBQU4sTUFBTSxRQUVqQjtBQUVELGdDQUFnQztBQUNoQyxNQUFNLENBQU4sSUFBWSxPQUVYO0FBRkQsV0FBWSxPQUFPO0lBQ2pCLDZDQUFhLENBQUE7QUFDZixDQUFDLEVBRlcsT0FBTyxLQUFQLE9BQU8sUUFFbEI7QUFFRCx5Q0FBeUM7QUFDekMsTUFBTSxDQUFOLElBQVksTUFJWDtBQUpELFdBQVksTUFBTTtJQUNoQixrQ0FBUSxDQUFBO0lBQ1Isa0NBQVEsQ0FBQTtJQUNSLGtDQUFRLENBQUE7QUFDVixDQUFDLEVBSlcsTUFBTSxLQUFOLE1BQU0sUUFJakI7QUFFRCxzQkFBc0I7QUFDdEIsTUFBTSxDQUFOLElBQVksSUFFWDtBQUZELFdBQVksSUFBSTtJQUNkLCtCQUFRLENBQUE7QUFDVixDQUFDLEVBRlcsSUFBSSxLQUFKLElBQUksUUFFZjtBQUVELGlDQUFpQztBQUNqQyxNQUFNLENBQU4sSUFBWSxNQUVYO0FBRkQsV0FBWSxNQUFNO0lBQ2hCLG9DQUFTLENBQUE7QUFDWCxDQUFDLEVBRlcsTUFBTSxLQUFOLE1BQU0sUUFFakI7QUFFRCw0QkFBNEI7QUFDNUIsTUFBTSxDQUFOLElBQVksSUFFWDtBQUZELFdBQVksSUFBSTtJQUNkLGdDQUFTLENBQUE7QUFDWCxDQUFDLEVBRlcsSUFBSSxLQUFKLElBQUksUUFFZiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFhMRU4gLSByZWdpc3RlciB3aWR0aFxuZXhwb3J0IGVudW0gWGxlbiB7XG4gIHdvcmQgPSAzMiAvLyBiaXRzXG59XG5cbi8vIFZDT1VOVCAtIHZjb3JlIGNvdW50XG5leHBvcnQgZW51bSBWY291bnQge1xuICBvbmUgPSAxXG59XG5cbi8vIE1SQ09VTlQgLSBtYXggcmVnaXN0ZXJzIGNvdW50XG5leHBvcnQgZW51bSBNcmNvdW50IHtcbiAgZGVmYXVsdCA9IDEyOFxufVxuXG4vLyBNRU1QT1cgLSBwb3dlcnMgb2YgMiBmb3IgbWVtb3J5IGxlbmd0aFxuZXhwb3J0IGVudW0gTWVtcG93IHtcbiAgbWluID0gMTYsXG4gIG1lZCA9IDI0LFxuICBtYXggPSAzMlxufVxuXG4vLyBWTlVNIC0gdmNvcmUgbnVtYmVyXG5leHBvcnQgZW51bSBWbnVtIHtcbiAgemVybyA9IDBcbn1cblxuLy8gSUFMSUdOIC0gaW5zdHJ1Y3Rpb24gYWxpZ25tZW50XG5leHBvcnQgZW51bSBJYWxpZ24ge1xuICB3b3JkID0gMzJcbn1cblxuLy8gSUxFTiAtIGluc3RydWN0aW9uIGxlbmd0aFxuZXhwb3J0IGVudW0gSWxlbiB7XG4gIHdvcmQgPSAzMlxufVxuIl19