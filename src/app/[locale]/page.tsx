"use client";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { 
  Grid, 
  Column, 
  Tile, 
  ClickableTile,
  Pagination,
  Button,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Tag,
  ProgressIndicator,
  ProgressStep,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  TextInput,
  NumberInput,
  Select,
  SelectItem,
  Accordion,
  AccordionItem,
  ToastNotification,
  InlineNotification
} from '@carbon/react';
import { 
  ArrowRight,
  ChevronRight,
  Report,
  Analytics,
  UserProfile,
  Settings,
  Notification,
  Dashboard,
  Add,
  Edit,
  View
} from '@carbon/icons-react';
import { ThemeToggle } from '../../components/theme-toggle';
import styles from "../page.module.css";

export default function Home() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
    router.push(newPath);
  };

  const getCurrentLocale = () => {
    return pathname.split('/')[1] || 'en';
  };

  // Sample data for components
  const grievanceStats = [
    { category: 'Water Supply', count: 45, status: 'active' },
    { category: 'Road Maintenance', count: 32, status: 'resolved' },
    { category: 'Electricity', count: 18, status: 'pending' },
    { category: 'Sanitation', count: 27, status: 'active' },
    { category: 'Education', count: 12, status: 'resolved' }
  ];

  const recentGrievances = [
    { id: 'GRV001', title: 'Water shortage in Ward 5', status: 'Open', priority: 'High', date: '2024-01-15' },
    { id: 'GRV002', title: 'Road repair needed', status: 'In Progress', priority: 'Medium', date: '2024-01-14' },
    { id: 'GRV003', title: 'Street light not working', status: 'Resolved', priority: 'Low', date: '2024-01-13' },
    { id: 'GRV004', title: 'Garbage collection issue', status: 'Open', priority: 'High', date: '2024-01-12' },
    { id: 'GRV005', title: 'School building maintenance', status: 'In Progress', priority: 'Medium', date: '2024-01-11' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'red';
      case 'In Progress': return 'blue';
      case 'Resolved': return 'green';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'blue';
      case 'Low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
      minHeight: '100vh', 
      padding: '2rem 0',
      fontFamily: 'IBM Plex Sans, sans-serif',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Header Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>

        {/* Hero Section */}
        <Grid style={{ marginBottom: '3rem' }}>
          <Column sm={4} md={8} lg={16}>
            <Tile style={{ 
              padding: '4rem 2rem', 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: 'none'
            }}>
              <h1 style={{ 
                fontSize: '3.5rem', 
                fontWeight: '700', 
                marginBottom: '1.5rem',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>
                {t('app.title')}
              </h1>
              <p style={{ 
                fontSize: '1.5rem', 
                marginBottom: '3rem',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: '300',
                lineHeight: '1.6'
              }}>
                Your voice matters. Report issues, track progress, and help build a better community.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button 
                  kind="tertiary" 
                  size="lg"
                  renderIcon={Add}
                  onClick={() => router.push(`/${getCurrentLocale()}/citizen/submit`)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    backdropFilter: 'blur(10px)',
                    padding: '12px 24px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Submit Grievance
                </Button>
                <Button 
                  kind="secondary" 
                  size="lg"
                  renderIcon={View}
                  onClick={() => router.push(`/${getCurrentLocale()}/login`)}
                  style={{
                    background: 'white',
                    color: '#667eea',
                    border: 'none',
                    padding: '12px 24px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Track Status
                </Button>
              </div>
            </Tile>
          </Column>
        </Grid>

        {/* Statistics Cards */}
        <Grid style={{ marginBottom: '4rem' }}>
          <Column sm={4} md={8} lg={8}>
            <Tile style={{ 
              height: '160px', 
              padding: '2rem',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
              color: 'white',
              boxShadow: '0 15px 35px rgba(255,107,107,0.3)',
              border: 'none',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
                <Report size={40} style={{ color: 'white', flexShrink: 0 }} />
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '700', color: 'white' }}>134</h3>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', fontWeight: '500' }}>Total Grievances</p>
                </div>
              </div>
            </Tile>
          </Column>
          <Column sm={4} md={8} lg={8}>
            <Tile style={{ 
              height: '160px', 
              padding: '2rem',
              background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
              color: 'white',
              boxShadow: '0 15px 35px rgba(81,207,102,0.3)',
              border: 'none',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
                <Analytics size={40} style={{ color: 'white', flexShrink: 0 }} />
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '700', color: 'white' }}>89</h3>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', fontWeight: '500' }}>Resolved Cases</p>
                </div>
              </div>
            </Tile>
          </Column>
        </Grid>

        {/* Progress Indicator */}
        <Grid style={{ marginBottom: '4rem' }}>
          <Column sm={4} md={8} lg={16}>
            <Tile style={{ 
              padding: '3rem 2rem',
              background: 'white',
              boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ 
                marginBottom: '2.5rem', 
                fontSize: '1.8rem', 
                fontWeight: '600',
                color: '#2c3e50',
                textAlign: 'center'
              }}>
                Grievance Resolution Process
              </h3>
              <ProgressIndicator currentIndex={1} style={{ marginTop: '2rem' }}>
                <ProgressStep 
                  complete 
                  label="Submit" 
                  description="Citizen submits grievance through our portal"
                />
                <ProgressStep 
                  current 
                  label="Review" 
                  description="Our team reviews and assigns to relevant department"
                />
                <ProgressStep 
                  label="Action" 
                  description="Department takes necessary action to resolve"
                />
                <ProgressStep 
                  label="Resolve" 
                  description="Issue resolved and citizen notified"
                />
              </ProgressIndicator>
            </Tile>
          </Column>
        </Grid>

        {/* Quick Actions */}
        <Grid style={{ marginBottom: '4rem' }}>
          <Column sm={4} md={8} lg={16}>
            <h2 style={{ 
              marginBottom: '2rem', 
              color: '#2c3e50',
              fontSize: '2.2rem',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Quick Actions
            </h2>
          </Column>
          <Column sm={4} md={4} lg={4}>
            <Tile 
              style={{ 
                height: '150px', 
                padding: '2rem', 
                textAlign: 'center',
                background: 'white',
                boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => router.push(`/${getCurrentLocale()}/citizen/submit`)}
            >
              <Add size={32} style={{ marginBottom: '1rem', color: '#667eea' }} />
              <p style={{ margin: 0, fontWeight: '600', fontSize: '1.1rem', color: '#2c3e50' }}>New Grievance</p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#7f8c8d' }}>Submit a new complaint</p>
            </Tile>
          </Column>
          <Column sm={4} md={4} lg={4}>
            <Tile 
              style={{ 
                height: '150px', 
                padding: '2rem', 
                textAlign: 'center',
                background: 'white',
                boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => router.push(`/${getCurrentLocale()}/login`)}
            >
              <View size={32} style={{ marginBottom: '1rem', color: '#51cf66' }} />
              <p style={{ margin: 0, fontWeight: '600', fontSize: '1.1rem', color: '#2c3e50' }}>Track Status</p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#7f8c8d' }}>Check your case status</p>
            </Tile>
          </Column>
          <Column sm={4} md={4} lg={4}>
            <Tile style={{ 
              height: '150px', 
              padding: '2rem', 
              textAlign: 'center',
              background: 'white',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Analytics size={32} style={{ marginBottom: '1rem', color: '#ff6b6b' }} />
              <p style={{ margin: 0, fontWeight: '600', fontSize: '1.1rem', color: '#2c3e50' }}>Reports</p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#7f8c8d' }}>View statistics & reports</p>
            </Tile>
          </Column>
          <Column sm={4} md={4} lg={4}>
            <Tile style={{ 
              height: '150px', 
              padding: '2rem', 
              textAlign: 'center',
              background: 'white',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserProfile size={32} style={{ marginBottom: '1rem', color: '#764ba2' }} />
              <p style={{ margin: 0, fontWeight: '600', fontSize: '1.1rem', color: '#2c3e50' }}>Profile</p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#7f8c8d' }}>Manage your account</p>
            </Tile>
          </Column>
        </Grid>

        {/* Recent Grievances Table */}
        <Grid style={{ marginBottom: '4rem' }}>
          <Column sm={4} md={8} lg={16}>
            <div style={{
              background: 'white',
              padding: '2rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <h2 style={{ 
                marginBottom: '2rem', 
                color: '#2c3e50',
                fontSize: '1.8rem',
                fontWeight: '600'
              }}>
                Recent Grievances
              </h2>
              <DataTable
                rows={recentGrievances.map((item, index) => ({
                  id: `row-${index}`,
                  grievanceId: item.id,
                  title: item.title,
                  status: item.status,
                  priority: item.priority,
                  date: item.date
                }))}
                headers={[
                  { key: 'grievanceId', header: 'ID' },
                  { key: 'title', header: 'Title' },
                  { key: 'status', header: 'Status' },
                  { key: 'priority', header: 'Priority' },
                  { key: 'date', header: 'Date' }
                ]}
              >
                {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                  <TableContainer style={{ background: 'transparent' }}>
                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => (
                            <TableHeader {...getHeaderProps({ header })} style={{
                              background: '#f8f9fa',
                              fontWeight: '600',
                              color: '#2c3e50'
                            }}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow {...getRowProps({ row })} style={{
                            borderBottom: '1px solid #ecf0f1',
                            transition: 'background-color 0.2s ease'
                          }}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id} style={{ padding: '1rem 0.75rem' }}>
                                {cell.info.header === 'status' ? (
                                  <Tag type={getStatusColor(cell.value)} style={{
                                    padding: '0.25rem 0.75rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                  }}>
                                    {cell.value}
                                  </Tag>
                                ) : cell.info.header === 'priority' ? (
                                  <Tag type={getPriorityColor(cell.value)} style={{
                                    padding: '0.25rem 0.75rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                  }}>
                                    {cell.value}
                                  </Tag>
                                ) : (
                                  <span style={{ color: '#2c3e50', fontWeight: '500' }}>
                                    {cell.value}
                                  </span>
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DataTable>
            </div>
          </Column>
        </Grid>

        {/* Categories Accordion */}
        <Grid style={{ marginBottom: '4rem' }}>
          <Column sm={4} md={8} lg={16}>
            <div style={{
              background: 'white',
              padding: '2rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <h2 style={{ 
                marginBottom: '2rem', 
                color: '#2c3e50',
                fontSize: '1.8rem',
                fontWeight: '600'
              }}>
                Grievance Categories
              </h2>
              <Accordion>
                <AccordionItem title="Infrastructure (45 active)">
                  <p style={{ color: '#34495e', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Issues related to roads, bridges, public buildings, and basic infrastructure facilities.
                  </p>
                  <div style={{ marginTop: '1rem' }}>
                    <Tag type="blue" style={{ marginRight: '0.5rem', padding: '0.25rem 0.75rem' }}>Roads</Tag>
                    <Tag type="green" style={{ marginRight: '0.5rem', padding: '0.25rem 0.75rem' }}>Buildings</Tag>
                    <Tag type="purple" style={{ padding: '0.25rem 0.75rem' }}>Bridges</Tag>
                  </div>
                </AccordionItem>
                <AccordionItem title="Utilities (32 active)">
                  <p style={{ color: '#34495e', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Water supply, electricity, internet connectivity, and other utility services.
                  </p>
                  <div style={{ marginTop: '1rem' }}>
                    <Tag type="cyan" style={{ marginRight: '0.5rem', padding: '0.25rem 0.75rem' }}>Water</Tag>
                    <Tag type="purple" style={{ marginRight: '0.5rem', padding: '0.25rem 0.75rem' }}>Electricity</Tag>
                    <Tag type="magenta" style={{ padding: '0.25rem 0.75rem' }}>Internet</Tag>
                  </div>
                </AccordionItem>
                <AccordionItem title="Public Services (27 active)">
                  <p style={{ color: '#34495e', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Healthcare, education, sanitation, and other public service related issues.
                  </p>
                  <div style={{ marginTop: '1rem' }}>
                    <Tag type="red" style={{ marginRight: '0.5rem', padding: '0.25rem 0.75rem' }}>Healthcare</Tag>
                    <Tag type="blue" style={{ marginRight: '0.5rem', padding: '0.25rem 0.75rem' }}>Education</Tag>
                    <Tag type="green" style={{ padding: '0.25rem 0.75rem' }}>Sanitation</Tag>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </Column>
        </Grid>

        {/* Pagination */}
        <Grid style={{ marginBottom: '3rem' }}>
          <Column sm={4} md={8} lg={16}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              background: 'white',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <Pagination
                totalItems={recentGrievances.length}
                pageSize={5}
                pageSizes={[5, 10, 20]}
                page={1}
                onChange={() => {}}
              />
            </div>
          </Column>
        </Grid>

        {/* Notification Examples */}
        <Grid style={{ marginBottom: '3rem' }}>
          <Column sm={4} md={8} lg={16}>
            <InlineNotification
              kind="success"
              title="System Status"
              subtitle="All systems are operational. Latest grievances are being processed normally."
              lowContrast
              hideCloseButton
              style={{
                boxShadow: '0 8px 20px rgba(81,207,102,0.15)',
                border: '1px solid rgba(81,207,102,0.2)'
              }}
            />
          </Column>
        </Grid>

        {/* Footer */}
        <Grid style={{ marginTop: '4rem' }}>
          <Column sm={4} md={8} lg={16}>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <p style={{ 
                margin: 0, 
                color: '#7f8c8d', 
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                © 2024 Grievance Portal. Your voice matters in building a better community.
              </p>
            </div>
          </Column>
        </Grid>

      </div>
    </div>
  );
}