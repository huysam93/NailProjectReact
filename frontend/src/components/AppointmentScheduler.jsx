import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import apiClient from '../api/axiosConfig';

const AppointmentScheduler = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await apiClient.get('/appointments');
                const formattedEvents = response.data.map(apt => ({
                    id: apt.id,
                    title: `${apt.customer_name} - ${apt.service_name || 'Dịch vụ'}`,
                    start: new Date(apt.appointment_date),
                    allDay: false
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error("Failed to fetch appointments for scheduler:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-[60vh] bg-white rounded-lg shadow-lg"><p>Loading schedule...</p></div>
    }

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg text-sm md:text-base">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek'
                }}
                events={events}
                height="70vh"
                locale="vi"
                buttonText={{
                    today: 'Hôm nay',
                    month: 'Tháng',
                    week: 'Tuần',
                    day: 'Ngày'
                }}
                eventColor="#DB2777"
                slotMinTime="08:00:00"
                slotMaxTime="20:00:00"
                allDaySlot={false}
            />
        </div>
    );
};

export default AppointmentScheduler;
