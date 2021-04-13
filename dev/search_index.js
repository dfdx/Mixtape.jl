var documenterSearchIndex = {"docs":
[{"location":"#API-Documentation","page":"API Documentation","title":"API Documentation","text":"","category":"section"},{"location":"","page":"API Documentation","title":"API Documentation","text":"Below is the API documentation for Mixtape.jl","category":"page"},{"location":"","page":"API Documentation","title":"API Documentation","text":"CurrentModule = Mixtape","category":"page"},{"location":"","page":"API Documentation","title":"API Documentation","text":"CompilationContext\nallow\ntransform\noptimize!\nshow_after_inference\nshow_after_optimization\ndebug\n@ctx\njit\n@load_call_interface","category":"page"},{"location":"#Mixtape.CompilationContext","page":"API Documentation","title":"Mixtape.CompilationContext","text":"abstract type CompilationContext end\n\nParametrize the Mixtape pipeline by inheriting from CompilationContext. Similar to the context objects in Cassette.jl. By using the interface methods show_after_inference, show_after_optimization, debug, transform, and optimize! – the user can control different parts of the compilation pipeline.\n\n\n\n\n\n","category":"type"},{"location":"#Mixtape.allow","page":"API Documentation","title":"Mixtape.allow","text":"allow(f::CompilationContext, args...)::Bool\n\nDetermines whether a user-defined transform or optimize! is allowed to look at a lowered CodeInfoTools.Builder object or Core.Compiler.IRCode.\n\nThe user is allowed to greenlight modules:\n\nallow(::MyCtx, m::Module) == m == SomeModule\n\nor even specific signatures\n\nallow(::MyCtx, fn::typeof(rand), args...) = true\n\n\n\n\n\n","category":"function"},{"location":"#Mixtape.transform","page":"API Documentation","title":"Mixtape.transform","text":"transform(ctx::CompilationContext, b::CodeInfoTools.Builder)::CodeInfoTools.Builder\n\nUser-defined transform which operates on lowered CodeInfo in the form of a CodeInfoTools.Builder object.\n\nTransforms might typically follow a simple \"replace\" format:\n\nfunction transform(::MyCtx, b)\n    for (k, st) in b\n        replace!(b, k, swap(st))\n    end\n    return b\nend\n\nbut more advanced formats are possible. For further utilities, please see CodeInfoTools.jl.\n\n\n\n\n\n","category":"function"},{"location":"#Mixtape.optimize!","page":"API Documentation","title":"Mixtape.optimize!","text":"optimize!(ctx::CompilationContext, ir::Core.Compiler.IRCode)::Core.Compiler.IRCode\n\nUser-defined transform which operates on inferred Core.Compiler.IRCode. This transform operates after a set of optimizations which mimic Julia's pipeline.\n\n\n\n\n\n","category":"function"},{"location":"#Mixtape.show_after_inference","page":"API Documentation","title":"Mixtape.show_after_inference","text":"show_after_inference(ctx::CompilationContext)::Bool\n\nTurns on a pipeline feature which will dump out CodeInfo after inference (including the user-defined transform transformation, if applied).\n\n\n\n\n\n","category":"function"},{"location":"#Mixtape.show_after_optimization","page":"API Documentation","title":"Mixtape.show_after_optimization","text":"show_after_optimization(ctx::CompilationContext)::Bool\n\nTurns on a pipeline feature which will dump out CodeInfo after optimization (including the user-defined optimize! transformation, if applied).\n\n\n\n\n\n","category":"function"},{"location":"#Mixtape.debug","page":"API Documentation","title":"Mixtape.debug","text":"debug(ctx::CompilationContext)::Bool\n\nTurn on debug tracing for inference and optimization. Displays an instrumentation trace as inference and optimization proceeds.\n\n\n\n\n\n","category":"function"},{"location":"#Mixtape.@ctx","page":"API Documentation","title":"Mixtape.@ctx","text":"@ctx(properties, expr)\n\nUtility macro which expands to implement a subtype of CompilationContext. Also allow the user to easily configure the debug static tracing features and show_after_inference/show_after_optimization Boolean function flags.\n\nUsage:\n\n@ctx (b1::Bool, b2::Bool, b3::Bool) struct MyCtx\n    fields...\nend\n\nExpands to:\n\nstruct MyCtx <: CompilationContext\n    fields...\nend\nshow_after_inference(::MyCtx) = b1\nshow_after_optimization(::MyCtx) = b2\ndebug(::MyCtx) = b3\n\n\n\n\n\n","category":"macro"},{"location":"#Mixtape.jit","page":"API Documentation","title":"Mixtape.jit","text":"jit(ctx::CompilationContext, f::F, tt::TT = Tuple{}) where {F, TT <: Type}\n\nCompile and specialize a method instance for signature Tuple{f, tt.parameters...} with pipeline parametrized by ctx.\n\nReturns a callable \"thunk\" Entry{F, RT, TT} where RT is the return type of the instance after inference.\n\n\n\n\n\n","category":"function"},{"location":"#Mixtape.@load_call_interface","page":"API Documentation","title":"Mixtape.@load_call_interface","text":"@load_call_interface()\n\nA macro which expands to load a generated function call into the scope of the calling module. This generated function can be applied to signature argument types Tuple{ctx<:CompilationContext, f<:Function, args...}. call then creates a new instance of ctx and calls Mixtape.jit – it then caches a ccall which calls a function pointer to the GPUCompiler-compiled LLVM module.\n\nThe call interface currently uses a slow ABI ccall – which costs an array allocation for each toplevel call. This allocation is required to construct a Vector{Any} for the arguments and pass a pointer to it over the line, where the call unboxes each argument.\n\n\n\n\n\n","category":"macro"}]
}
