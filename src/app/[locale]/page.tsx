"use client";
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Grid, 
  Column, 
  Tile, 
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
  Modal,
  StructuredListWrapper,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  Section,
  Heading
} from '@carbon/react';
import { 
  Report,
  Analytics,
  Add,
  View
} from '@carbon/icons-react';
import { useTickets } from '../../store/useTickets';

export default function Home() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { tickets, selectedTicket, setSelectedTicket } = useTickets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const switchLanguage = (locale: string) => {
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
    router.push(newPath);
  };

  const getCurrentLocale = () => {
    return pathname.split('/')[1] || 'en';
  };

  // Handle ticket click
  const handleTicketClick = (ticketId: string) => {
    const fullTicket = tickets.find(t => t.id === ticketId);
    if (fullTicket) {
      setSelectedTicket(fullTicket);
      setIsModalOpen(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  // Get recent tickets for display (last 5)
  const recentGrievances = tickets
    .slice(-5)
    .reverse()
    .map(ticket => ({
      id: `row-${ticket.id}`,
      grievanceId: ticket.id,
      title: ticket.title_en,
      status: ticket.status,
      priority: ticket.priority,
      date: new Date(ticket.created_at_iso).toLocaleDateString()
    }));

  // Calculate statistics
  const totalTickets = tickets.length;
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'Resolved').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'red';
      case 'In Progress': return 'blue';
      case 'Resolved': return 'green';
      case 'Closed': return 'gray';
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
      fontFamily: 'IBM Plex Sans, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
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
                color: 'white'
              }}>
                Grievance Portal
              </h1>
              <p style={{ 
                fontSize: '1.5rem', 
                marginBottom: '3rem',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: '300'
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
                    color: 'white'
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
                    color: '#667eea'
                  }}
                >
                  Track Status
                </Button>
              </div>
            </Tile>
          </Column>
        </Grid>

        {/* Statistics Section */}
        <Grid style={{ marginBottom: '3rem' }}>
          <Column sm={4} md={8} lg={8}>
            <Tile style={{ 
              height: '160px', 
              padding: '2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
                <Report size={40} style={{ color: 'white' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '700', color: 'white' }}>{totalTickets}</h3>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>Total Grievances</p>
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
                <Analytics size={40} style={{ color: 'white' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '700', color: 'white' }}>{resolvedTickets}</h3>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>Resolved Cases</p>
                </div>
              </div>
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
                rows={recentGrievances}
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
                            <TableHeader {...getHeaderProps({ header })} key={header.key}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow 
                            {...getRowProps({ row })} 
                            key={row.id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleTicketClick(row.cells.find(cell => cell.info.header === 'grievanceId')?.value)}
                          >
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>
                                {cell.info.header === 'status' ? (
                                  <Tag type={getStatusColor(cell.value)}>
                                    {cell.value}
                                  </Tag>
                                ) : cell.info.header === 'priority' ? (
                                  <Tag type={getPriorityColor(cell.value)}>
                                    {cell.value}
                                  </Tag>
                                ) : (
                                  cell.value
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

      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onRequestClose={closeModal}
        modalHeading={selectedTicket ? `Grievance Details - ${selectedTicket.id}` : 'Grievance Details'}
        modalLabel="Ticket Information"
        primaryButtonText="Close"
        onRequestSubmit={closeModal}
        size="lg"
      >
        {selectedTicket && (
          <div>
            <Grid fullWidth>
              <Column sm={4} md={8} lg={16}>
                <Section>
                  <Heading style={{ marginBottom: '0.5rem' }}>Title</Heading>
                  <Tile style={{ marginBottom: '1rem' }}>
                    {selectedTicket.title_en}
                  </Tile>
                </Section>
              </Column>
              
              <Column sm={4} md={8} lg={16}>
                <Section>
                  <Heading style={{ marginBottom: '0.5rem' }}>Description</Heading>
                  <Tile style={{ marginBottom: '1rem' }}>
                    {selectedTicket.description}
                  </Tile>
                </Section>
              </Column>

              <Column sm={2} md={4} lg={8}>
                <Section>
                  <Heading style={{ marginBottom: '0.5rem' }}>Status</Heading>
                  <Tag type={getStatusColor(selectedTicket.status)}>
                    {selectedTicket.status}
                  </Tag>
                </Section>
              </Column>
              
              <Column sm={2} md={4} lg={8}>
                <Section>
                  <Heading style={{ marginBottom: '0.5rem' }}>Priority</Heading>
                  <Tag type={getPriorityColor(selectedTicket.priority)}>
                    {selectedTicket.priority}
                  </Tag>
                </Section>
              </Column>

              <Column sm={4} md={8} lg={16}>
                <Section>
                  <Heading style={{ marginBottom: '1rem' }}>Details</Heading>
                  <StructuredListWrapper>
                    <StructuredListBody>
                      <StructuredListRow>
                        <StructuredListCell head>Category</StructuredListCell>
                        <StructuredListCell>{selectedTicket.category_id}</StructuredListCell>
                      </StructuredListRow>
                      <StructuredListRow>
                        <StructuredListCell head>Ward</StructuredListCell>
                        <StructuredListCell>{selectedTicket.ward_id}</StructuredListCell>
                      </StructuredListRow>
                      <StructuredListRow>
                        <StructuredListCell head>Submitted By</StructuredListCell>
                        <StructuredListCell>{selectedTicket.name}</StructuredListCell>
                      </StructuredListRow>
                      <StructuredListRow>
                        <StructuredListCell head>Contact</StructuredListCell>
                        <StructuredListCell>{selectedTicket.phone}</StructuredListCell>
                      </StructuredListRow>
                    </StructuredListBody>
                  </StructuredListWrapper>
                </Section>
              </Column>
            </Grid>
          </div>
        )}
      </Modal>
    </div>
  );
}
