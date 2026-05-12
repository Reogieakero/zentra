export default function PrincipalDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1e293b' }}>
        Welcome back, Principal
      </h1>
      <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
        Here is what is happening at your school today.
      </p>
      
      {/* You can add Stat Cards here later */}
      <div style={{ marginTop: '2rem', height: '200px', border: '2px dashed #e2e8f0', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
        Dashboard Stats coming soon...
      </div>
    </div>
  );
}