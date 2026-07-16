export const PDF_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #f8f8fb;
    color: #111827;
    min-height: 100vh;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    max-width: 860px;
    margin: 0 auto;
    background: #fff;
    min-height: 100vh;
    box-shadow: 0 0 40px rgba(0,0,0,0.08);
  }

  .report-header {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    padding: 40px 48px 32px;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .report-header::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    background: rgba(255,255,255,0.06);
    border-radius: 50%;
  }
  .report-header::after {
    content: '';
    position: absolute;
    bottom: -40px; left: 40%;
    width: 140px; height: 140px;
    background: rgba(255,255,255,0.04);
    border-radius: 50%;
  }

  .school-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.75;
    margin-bottom: 6px;
  }

  .report-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.15;
    margin-bottom: 20px;
  }
  .report-title em { font-style: italic; opacity: 0.85; }

  .student-meta-band {
    display: flex;
    gap: 32px;
    align-items: center;
    flex-wrap: wrap;
  }

  .student-avatar {
    width: 52px; height: 52px;
    background: rgba(255,255,255,0.2);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    border: 2px solid rgba(255,255,255,0.4);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; font-weight: 700;
    flex-shrink: 0;
  }

  .meta-grid { display: flex; gap: 24px; flex-wrap: wrap; }
  .meta-item { display: flex; flex-direction: column; gap: 2px; }
  .meta-key { font-size: 10px; font-weight: 600; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.08em; }
  .meta-val { font-size: 13px; font-weight: 700; }

  .header-actions { margin-left: auto; display: flex; gap: 10px; align-items: center; }

  .btn-print {
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color: #6366f1;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; gap: 7px;
    transition: opacity 0.15s;
  }
  .btn-print:hover { opacity: 0.88; }

  .summary-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid #f0f0f4;
  }
  .summary-card {
    padding: 20px 24px;
    border-right: 1px solid #f0f0f4;
    display: flex; flex-direction: column; gap: 4px;
  }
  .summary-card:last-child { border-right: none; }
  .s-label { font-size: 10px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; }
  .s-value { font-size: 1.8rem; font-weight: 800; line-height: 1; }
  .s-sub { font-size: 11px; color: #9ca3af; }

  .legend-bar {
    display: flex; gap: 20px; align-items: center;
    padding: 14px 48px;
    background: #fafafa;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    border-bottom: 1px solid #f0f0f4;
    flex-wrap: wrap;
  }
  .legend-label { font-size: 10px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.08em; margin-right: 4px; }
  .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #374151; font-weight: 500; }
  .legend-dot {
    width: 10px; height: 10px;
    border-radius: 3px;
    flex-shrink: 0;
    display: inline-block;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .table-wrap { padding: 0 0 40px; }

  .section-heading {
    padding: 24px 48px 12px;
    font-size: 11px;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  table { width: 100%; border-collapse: collapse; table-layout: fixed; }

  col.col-date     { width: 130px; }
  col.col-status   { width: 100px; }
  col.col-clockin  { width: 100px; }
  col.col-clockout { width: 100px; }
  col.col-duration { width: 90px; }
  col.col-timeline { width: auto; }

  thead tr {
    background: #fafafa;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    border-top: 1px solid #f0f0f4;
    border-bottom: 1px solid #e5e7eb;
  }
  thead th {
    padding: 10px 16px;
    font-size: 10px;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    text-align: left;
  }
  thead th:first-child { padding-left: 48px; }
  thead th:last-child  { padding-right: 48px; }
  tbody tr:hover { background: #fafafa; }

  .report-footer {
    border-top: 1px dashed #e5e7eb;
    padding: 20px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-note { font-size: 10px; color: #9ca3af; }
  .footer-brand { font-size: 10px; color: #c4b5fd; font-weight: 700; letter-spacing: 0.06em; }

  @page {
    margin: 0;
    size: A4;
  }

  @media print {
    body {
      background: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      margin: 0;
    }
    .page { box-shadow: none; max-width: 100%; margin: 0; }
    .btn-print, .btn-download, .header-actions { display: none !important; }
    .report-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .legend-dot { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .summary-strip, .summary-card, .legend-bar { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    table { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    thead tr { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    tr, td, th { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`;