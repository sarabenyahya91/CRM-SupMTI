

export default function Logo({ height = 'h-10', width = 'w-40', crm = 'text-2xl', supmti = 'text-lg' }) {
    return (<div className="relative flex items-center justify-center my-2">

        <div
            className={`absolute ${width} ${height} border border-blue-500 rounded-full`}
        ></div>

        <h1 className={`relative text-blue-500 ${crm} font-semibold tracking-wide`}>
            CRM
        </h1><span className={`block ${supmti} font-light tracking-wider text-orange-400 ms-3`}>SupMTI</span>
    </div>
    );
}